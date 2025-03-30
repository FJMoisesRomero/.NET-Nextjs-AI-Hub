using Microsoft.AspNetCore.Mvc;
using AIHub.API.DTOs;
using AIHub.API.Services;
using Microsoft.Extensions.Logging;

namespace AIHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenerationController : ControllerBase
{
    private readonly IAIService _aiService;
    private readonly IAudioService _audioService;
    private readonly IVideoService _videoService;
    private readonly ILogger<GenerationController> _logger;

    public GenerationController(
        IAIService aiService, 
        IAudioService audioService, 
        IVideoService videoService,
        ILogger<GenerationController> logger)
    {
        _aiService = aiService;
        _audioService = audioService;
        _videoService = videoService;
        _logger = logger;
    }

    [HttpPost("text")]
    public async Task<IActionResult> GenerateText([FromBody] GenerationRequest request)
    {
        try
        {
            _logger.LogInformation("Received text generation request with prompt: {Prompt}", request.Prompt);
            
            if (string.IsNullOrWhiteSpace(request.Prompt))
            {
                return BadRequest(new { error = "Prompt cannot be empty" });
            }

            var result = await _aiService.GenerateText(request.Prompt);
            return Ok(new { text = result });
        }
        catch (NotImplementedException ex)
        {
            _logger.LogError(ex, "Feature not implemented");
            return StatusCode(501, new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing text generation request");
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("image")]
    public async Task<IActionResult> GenerateImage([FromBody] GenerationRequest request)
    {
        try
        {
            _logger.LogInformation("Received image generation request with prompt: {Prompt}", request.Prompt);
            
            if (string.IsNullOrWhiteSpace(request.Prompt))
            {
                return BadRequest(new { error = "Prompt cannot be empty" });
            }

            var imageUrl = await _aiService.GenerateImage(request.Prompt);
            return Ok(new { url = imageUrl });
        }
        catch (NotImplementedException ex)
        {
            _logger.LogError(ex, "Feature not implemented");
            return StatusCode(501, new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing image generation request");
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("code")]
    public async Task<IActionResult> GenerateCode([FromBody] GenerationRequest request)
    {
        try
        {
            _logger.LogInformation("Received code generation request with prompt: {Prompt}", request.Prompt);
            
            if (string.IsNullOrWhiteSpace(request.Prompt))
            {
                return BadRequest(new { error = "Prompt cannot be empty" });
            }

            var code = await _aiService.GenerateCode(request.Prompt);
            return Ok(new { code = code });
        }
        catch (NotImplementedException ex)
        {
            _logger.LogError(ex, "Feature not implemented");
            return StatusCode(501, new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing code generation request");
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("audio")]
    public async Task<IActionResult> GenerateAudio([FromBody] GenerationRequest request)
    {
        try
        {
            var audioUrl = await _audioService.GenerateAudioAsync(request.Prompt);
            return Ok(new { audioUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating audio");
            return StatusCode(500, new { error = "Error generating audio" });
        }
    }

    [HttpPost("video")]
    public async Task<IActionResult> GenerateVideo([FromBody] GenerationRequest request)
    {
        try
        {
            _logger.LogInformation("Received video generation request with prompt: {Prompt}", request.Prompt);
            
            if (string.IsNullOrWhiteSpace(request.Prompt))
            {
                return BadRequest(new { error = "Prompt cannot be empty" });
            }

            var videoUrl = await _videoService.GenerateVideoAsync(request.Prompt);
            return Ok(new { videoUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating video");
            return StatusCode(500, new { error = ex.Message });
        }
    }
}
