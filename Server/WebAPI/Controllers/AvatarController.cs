using BusinessLogic.Dtos;
using BusinessLogic.Services.IServices;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/uploads/avatars")]
public class AvatarController : ControllerBase
{
    private readonly IApplicationUserService _applicationUserService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly string directory = Path.Combine("wwwroot", "uploads", "avatars");

    public AvatarController(UserManager<ApplicationUser> userManager,
        IApplicationUserService applicationUserService)
    {
        _userManager = userManager;
        _applicationUserService = applicationUserService;
    }

    [HttpPost]
    public async Task<ActionResult> Upload(IFormFile avatar)
    {
        var userId = _userManager.GetUserId(User)!;

        if (avatar == null || avatar.Length == 0)
            return BadRequest("File is empty");

        if (!avatar.ContentType.StartsWith("image/"))
            return BadRequest("Invalid file type");

        if (!Directory.Exists(directory))
            Directory.CreateDirectory(directory);

        var fileName = $"{userId}.webp";
        var path = Path.Combine(directory, fileName);

        using var stream = new FileStream(path, FileMode.Create);
        await avatar.CopyToAsync(stream);

        var updatedUser = await _applicationUserService.UpdateAsync(
            userId,
            new UpdateApplicationUserDto
            {
                AvatarUri = $"/uploads/avatars/{fileName}"
            });

        return Ok(updatedUser);
    }

    [HttpDelete]
    public async Task<ActionResult> Remove()
    {
        var userId = _userManager.GetUserId(User)!;

        var fileName = $"{userId}.webp";
        var path = Path.Combine(directory, fileName);

        if (System.IO.File.Exists(path))
        {
            System.IO.File.Delete(path);

            await _applicationUserService.UpdateAsync(
                userId,
                new UpdateApplicationUserDto
                {
                    AvatarUri = ""
                });

            return Ok();
        }

        return NotFound();
    }
}