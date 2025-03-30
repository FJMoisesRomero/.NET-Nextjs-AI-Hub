using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AIHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UtilsController : ControllerBase
{
    private readonly ILogger<UtilsController> _logger;

    public UtilsController(ILogger<UtilsController> logger)
    {
        _logger = logger;
    }

    [HttpPost("open-in-notepad")]
    public async Task<IActionResult> OpenInNotepad([FromBody] OpenInNotepadRequest request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.Content))
            {
                return BadRequest(new { error = "Content cannot be empty" });
            }

            // Create a temporary file
            var tempFilePath = Path.Combine(Path.GetTempPath(), $"code_{Guid.NewGuid()}.txt");
            await System.IO.File.WriteAllTextAsync(tempFilePath, request.Content);

            // Start Notepad with the temporary file
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "notepad.exe",
                    Arguments = tempFilePath,
                    UseShellExecute = true
                }
            };

            process.Start();
            return Ok(new { message = "File opened in Notepad" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error opening file in Notepad");
            return StatusCode(500, new { error = "Failed to open file in Notepad" });
        }
    }
}

public class OpenInNotepadRequest
{
    public string Content { get; set; }
}
