using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AIHub.API.Services;

public interface IImageGenerationService
{
    Task<string> GenerateImage(string prompt);
}

public class StabilityAIService : IImageGenerationService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly ILogger<StabilityAIService> _logger;
    private const string API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

    public StabilityAIService(IConfiguration configuration, ILogger<StabilityAIService> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
        
        var apiKey = configuration["StabilityAI:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            _logger.LogError("Stability AI API key not found in configuration");
            throw new InvalidOperationException("Stability AI API key not configured");
        }
        _apiKey = apiKey;
        
        // Configurar el cliente HTTP
        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
        _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
        
        _logger.LogInformation("Stability AI service initialized successfully");
    }

    public async Task<string> GenerateImage(string prompt)
    {
        try
        {
            _logger.LogInformation("Generating image for prompt: {Prompt}", prompt);

            var requestBody = new
            {
                text_prompts = new[]
                {
                    new
                    {
                        text = prompt,
                        weight = 1
                    }
                },
                cfg_scale = 7,
                height = 1024,
                width = 1024,
                steps = 30,
                samples = 1
            };

            var content = new StringContent(
                JsonSerializer.Serialize(requestBody),
                Encoding.UTF8,
                "application/json"
            );

            // Loguear la solicitud para depuración
            _logger.LogInformation("Sending request to Stability AI with headers: {Headers}", 
                string.Join(", ", _httpClient.DefaultRequestHeaders.Select(h => $"{h.Key}: {string.Join(", ", h.Value)}")));

            var response = await _httpClient.PostAsync(API_URL, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Stability AI API error: {StatusCode} - {Content}", 
                    response.StatusCode, responseContent);
                
                throw new HttpRequestException(
                    $"Stability AI API error: {response.StatusCode} - {responseContent}");
            }

            var imageUrl = ExtractImageUrlFromResponse(responseContent);
            _logger.LogInformation("Successfully generated image");
            return imageUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating image for prompt: {Prompt}", prompt);
            throw;
        }
    }

    private string ExtractImageUrlFromResponse(string jsonResponse)
    {
        try
        {
            using var doc = JsonDocument.Parse(jsonResponse);
            var root = doc.RootElement;

            // Loguear la respuesta completa para depuración
            _logger.LogInformation("Received response: {Response}", jsonResponse);

            var artifacts = root.GetProperty("artifacts");
            var firstImage = artifacts.EnumerateArray().First();
            var base64Image = firstImage.GetProperty("base64").GetString();

            if (string.IsNullOrEmpty(base64Image))
            {
                throw new InvalidOperationException("No image data found in response");
            }

            return $"data:image/png;base64,{base64Image}";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error extracting image URL from response: {Response}", jsonResponse);
            throw new InvalidOperationException("Failed to parse response from Stability AI API", ex);
        }
    }
}
