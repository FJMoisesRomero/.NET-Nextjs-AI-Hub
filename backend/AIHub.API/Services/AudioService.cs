using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.IO;

namespace AIHub.API.Services
{
    public interface IAudioService
    {
        Task<string> GenerateAudioAsync(string prompt);
    }

    public class AudioService : IAudioService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<AudioService> _logger;
        private readonly string _apiKey;
        private const string DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice

        public AudioService(HttpClient httpClient, IConfiguration configuration, ILogger<AudioService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _apiKey = configuration["ElevenLabs:ApiKey"] ?? throw new ArgumentNullException("ElevenLabs:ApiKey");
            
            _httpClient.BaseAddress = new Uri("https://api.elevenlabs.io/v1/");
            _httpClient.DefaultRequestHeaders.Add("xi-api-key", _apiKey);
        }

        public async Task<string> GenerateAudioAsync(string prompt)
        {
            try
            {
                _logger.LogInformation("Iniciando generación de audio con prompt: {Prompt}", prompt);

                var request = new
                {
                    text = prompt,
                    model_id = "eleven_multilingual_v2",
                    voice_settings = new
                    {
                        stability = 0.5,
                        similarity_boost = 0.75
                    }
                };

                var jsonRequest = JsonSerializer.Serialize(request);
                _logger.LogInformation("Request a ElevenLabs: {Request}", jsonRequest);

                var content = new StringContent(
                    jsonRequest,
                    System.Text.Encoding.UTF8,
                    "application/json"
                );

                // Endpoint correcto según la documentación
                var response = await _httpClient.PostAsync(
                    $"text-to-speech/{DEFAULT_VOICE_ID}",
                    content
                );

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"ElevenLabs API error: {error}");
                    throw new Exception($"Error generating audio: {response.StatusCode} - {error}");
                }

                _logger.LogInformation("Respuesta exitosa de ElevenLabs. Content-Type: {ContentType}", 
                    response.Content.Headers.ContentType?.MediaType);

                // Guardar el archivo de audio
                var fileName = $"{Guid.NewGuid()}.mp3";
                var directory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "audio");
                
                if (!Directory.Exists(directory))
                {
                    _logger.LogInformation("Creando directorio: {Directory}", directory);
                    Directory.CreateDirectory(directory);
                }
                
                var filePath = Path.Combine(directory, fileName);
                _logger.LogInformation("Guardando archivo de audio en: {FilePath}", filePath);
                
                // Leer el stream de audio directamente
                using (var fileStream = File.Create(filePath))
                using (var audioStream = await response.Content.ReadAsStreamAsync())
                {
                    await audioStream.CopyToAsync(fileStream);
                }

                var fileInfo = new FileInfo(filePath);
                if (!fileInfo.Exists || fileInfo.Length == 0)
                {
                    throw new Exception($"Error: El archivo de audio no se guardó correctamente en {filePath}");
                }

                _logger.LogInformation("Archivo de audio guardado exitosamente. Tamaño: {Size} bytes", fileInfo.Length);

                // Devolver solo la ruta relativa
                return $"/audio/{fileName}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating audio with ElevenLabs: {Message}", ex.Message);
                throw;
            }
        }
    }
}
