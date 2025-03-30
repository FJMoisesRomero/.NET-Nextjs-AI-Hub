using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AIHub.API.Services;

public interface IAIService
{
    Task<string> GenerateText(string prompt);
    Task<string> GenerateImage(string prompt);
    Task<string> GenerateCode(string prompt);
}

public class GeminiService : IAIService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly ILogger<GeminiService> _logger;
    private readonly IImageGenerationService _imageService;
    private const string BASE_URL = "https://generativelanguage.googleapis.com/v1/models";
    private const string DEFAULT_MODEL = "gemini-2.0-flash";

    public GeminiService(
        IConfiguration configuration, 
        ILogger<GeminiService> logger, 
        HttpClient httpClient,
        IImageGenerationService imageService)
    {
        _logger = logger;
        _httpClient = httpClient;
        _imageService = imageService;
        
        var apiKey = configuration["Gemini:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            _logger.LogError("Gemini API key not found in configuration");
            throw new InvalidOperationException("Gemini API key not configured");
        }
        _apiKey = apiKey;
        
        _logger.LogInformation("Gemini service initialized successfully");
    }

    public async Task<string> GenerateText(string prompt)
    {
        try
        {
            _logger.LogInformation("Generating text for prompt: {Prompt}", prompt);

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        role = "user",
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.7,
                    topK = 40,
                    topP = 0.95,
                    maxOutputTokens = 2048
                }
            };

            var response = await MakeRequest(requestBody, DEFAULT_MODEL);
            return ExtractTextFromResponse(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating text for prompt: {Prompt}", prompt);
            throw;
        }
    }

    public async Task<string> GenerateImage(string prompt)
    {
        return await _imageService.GenerateImage(prompt);
    }

    public async Task<string> GenerateCode(string prompt)
    {
        try
        {
            _logger.LogInformation("Generating code for prompt: {Prompt}", prompt);

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        role = "user",
                        parts = new[]
                        {
                            new { text = $"Generate code for the following request: {prompt}. Provide only code as response, no explanations." }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.2,
                    topK = 40,
                    topP = 0.95,
                    maxOutputTokens = 2048
                }
            };

            var response = await MakeRequest(requestBody, DEFAULT_MODEL);
            return ExtractTextFromResponse(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating code for prompt: {Prompt}", prompt);
            throw;
        }
    }

    private async Task<string> MakeRequest(object requestBody, string model)
    {
        var url = $"{BASE_URL}/{model}:generateContent?key={_apiKey}";
        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(url, content);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    private string ExtractTextFromResponse(string jsonResponse)
    {
        try
        {
            using var doc = JsonDocument.Parse(jsonResponse);
            var root = doc.RootElement;

            if (!root.TryGetProperty("candidates", out var candidates) || candidates.GetArrayLength() == 0)
            {
                throw new InvalidOperationException("No candidates found in response");
            }

            var firstCandidate = candidates[0];
            if (!firstCandidate.TryGetProperty("content", out var content))
            {
                throw new InvalidOperationException("No content found in candidate");
            }

            if (!content.TryGetProperty("parts", out var parts) || parts.GetArrayLength() == 0)
            {
                throw new InvalidOperationException("No parts found in content");
            }

            var firstPart = parts[0];
            if (!firstPart.TryGetProperty("text", out var textElement))
            {
                throw new InvalidOperationException("No text found in part");
            }

            var text = textElement.GetString();
            if (string.IsNullOrEmpty(text))
            {
                throw new InvalidOperationException("Empty text in response");
            }

            return text;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error extracting text from response: {Response}", jsonResponse);
            throw new InvalidOperationException("Failed to parse response from Gemini API", ex);
        }
    }
}
