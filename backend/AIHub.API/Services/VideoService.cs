using System;
using System.Text;
using System.Text.Json;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AIHub.API.Services
{
    public interface IVideoService
    {
        Task<string> GenerateVideoAsync(string prompt);
    }

    public class VideoService : IVideoService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<VideoService> _logger;
        private readonly string _rapidApiKey;
        private const string API_URL = "https://text-to-video.p.rapidapi.com/v3/process_text_and_search_media";
        private const string API_HOST = "text-to-video.p.rapidapi.com";

        public VideoService(HttpClient httpClient, IConfiguration configuration, ILogger<VideoService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _rapidApiKey = configuration["RapidAPI:Key"] ?? throw new InvalidOperationException("RapidAPI key not configured");

            // Configure default headers for RapidAPI
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Key", _rapidApiKey);
            _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Host", API_HOST);
        }

        public async Task<string> GenerateVideoAsync(string prompt)
        {
            try
            {
                _logger.LogInformation("Generating video for prompt: {Prompt}", prompt);

                var requestBody = new
                {
                    scripts = new[] { prompt },
                    dimension = "16:9",
                    search_mode = "general",
                    style = "cinematic",
                    aspect_ratio = "16:9",
                    duration = "10-20"
                };

                _logger.LogInformation("Making request to Text-to-Video API");

                var content = new StringContent(
                    JsonSerializer.Serialize(requestBody),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await _httpClient.PostAsync(API_URL, content);
                var responseContent = await response.Content.ReadAsStringAsync();
                
                _logger.LogInformation("Received response from API: {Response}", responseContent);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("API request failed with status code {StatusCode}. Response: {Response}", 
                        response.StatusCode, responseContent);
                    throw new HttpRequestException($"API request failed with status {response.StatusCode}. Response: {responseContent}");
                }

                var responseData = JsonSerializer.Deserialize<JsonElement>(responseContent);

                // First check for any error messages
                if (responseData.TryGetProperty("error", out var error))
                {
                    var errorMessage = error.GetString();
                    throw new InvalidOperationException($"API returned error: {errorMessage}");
                }

                // Try to get the video URL from different possible response formats
                string? videoUrl = null;

                if (responseData.TryGetProperty("video_url", out var directUrl))
                {
                    videoUrl = directUrl.GetString();
                }
                else if (responseData.TryGetProperty("output", out var output) && 
                         output.TryGetProperty("url", out var outputUrl))
                {
                    videoUrl = outputUrl.GetString();
                }
                else if (responseData.TryGetProperty("result", out var result) && 
                         result.TryGetProperty("video_url", out var resultUrl))
                {
                    videoUrl = resultUrl.GetString();
                }

                if (string.IsNullOrEmpty(videoUrl))
                {
                    _logger.LogError("No video URL found in response: {Response}", responseContent);
                    throw new InvalidOperationException("No video URL found in response");
                }

                _logger.LogInformation("Successfully generated video: {Url}", videoUrl);
                return videoUrl;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating video with prompt: {Prompt}", prompt);
                throw;
            }
        }
    }
}
