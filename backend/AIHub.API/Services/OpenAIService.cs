using Azure.AI.OpenAI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AIHub.API.Services;

public interface IOpenAIService
{
    Task<string> GenerateText(string prompt);
    Task<string> GenerateImage(string prompt);
    Task<string> GenerateCode(string prompt);
}

public class OpenAIService : IOpenAIService
{
    private readonly OpenAIClient _client;
    private readonly IConfiguration _configuration;
    private readonly ILogger<OpenAIService> _logger;
    private const string MODEL_DEPLOYMENT = "gpt-3.5-turbo";  

    public OpenAIService(IConfiguration configuration, ILogger<OpenAIService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        
        try
        {
            var apiKey = _configuration["OpenAI:ApiKey"];
            _logger.LogInformation("Initializing OpenAI client");
            
            if (string.IsNullOrEmpty(apiKey))
            {
                _logger.LogError("OpenAI API key not found in configuration");
                throw new InvalidOperationException("OpenAI API key not configured");
            }
            
            _client = new OpenAIClient(apiKey);
            _logger.LogInformation("OpenAI client initialized successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error initializing OpenAI client");
            throw;
        }
    }

    public async Task<string> GenerateText(string prompt)
    {
        try
        {
            _logger.LogInformation("Generating text for prompt: {Prompt}", prompt);
            
            var options = new ChatCompletionsOptions
            {
                DeploymentName = MODEL_DEPLOYMENT,
                Messages =
                {
                    new ChatMessage(ChatRole.System, "You are a helpful AI assistant."),
                    new ChatMessage(ChatRole.User, prompt)
                },
                MaxTokens = 800
            };

            _logger.LogInformation("Sending request to OpenAI API");
            var chatCompletions = await _client.GetChatCompletionsAsync(options);
            _logger.LogInformation("Received response from OpenAI API");

            if (chatCompletions.Value.Choices.Count == 0)
            {
                _logger.LogError("No choices returned from OpenAI API");
                throw new InvalidOperationException("No response generated");
            }

            var result = chatCompletions.Value.Choices[0].Message.Content;
            _logger.LogInformation("Successfully generated text response");
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating text for prompt: {Prompt}", prompt);
            throw;
        }
    }

    public async Task<string> GenerateImage(string prompt)
    {
        try
        {
            _logger.LogInformation("Generating image for prompt: {Prompt}", prompt);
            
            var imageOptions = new ImageGenerationOptions
            {
                Prompt = prompt,
                Size = ImageSize.Size1024x1024
            };

            _logger.LogInformation("Sending request to OpenAI API for image generation");
            var imageGenerations = await _client.GetImageGenerationsAsync(imageOptions);
            _logger.LogInformation("Received response from OpenAI API");

            if (imageGenerations.Value.Data.Count == 0)
            {
                _logger.LogError("No images generated from OpenAI API");
                throw new InvalidOperationException("No image generated");
            }

            var imageUrl = imageGenerations.Value.Data[0].Url.ToString();
            _logger.LogInformation("Successfully generated image URL");
            return imageUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating image for prompt: {Prompt}", prompt);
            throw;
        }
    }

    public async Task<string> GenerateCode(string prompt)
    {
        try
        {
            _logger.LogInformation("Generating code for prompt: {Prompt}", prompt);
            
            var options = new ChatCompletionsOptions
            {
                DeploymentName = MODEL_DEPLOYMENT,
                Messages =
                {
                    new ChatMessage(ChatRole.System, "You are a helpful programming assistant. Provide only code as response, no explanations."),
                    new ChatMessage(ChatRole.User, prompt)
                },
                MaxTokens = 800
            };

            _logger.LogInformation("Sending request to OpenAI API");
            var chatCompletions = await _client.GetChatCompletionsAsync(options);
            _logger.LogInformation("Received response from OpenAI API");

            if (chatCompletions.Value.Choices.Count == 0)
            {
                _logger.LogError("No choices returned from OpenAI API");
                throw new InvalidOperationException("No response generated");
            }

            var result = chatCompletions.Value.Choices[0].Message.Content;
            _logger.LogInformation("Successfully generated code response");
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating code for prompt: {Prompt}", prompt);
            throw;
        }
    }
}
