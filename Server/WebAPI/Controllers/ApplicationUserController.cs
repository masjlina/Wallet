using BusinessLogic.Dtos;
using BusinessLogic.Services.IServices;
using BusinessLogic.Services;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Controllers.IControllers;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/users")]
public class ApplicationUserController : ControllerBase
{
    private readonly IApplicationUserService _applicationUserService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ApplicationUserController(UserManager<ApplicationUser> userManager,
        IApplicationUserService applicationUserService)
    {
        _userManager = userManager;
        _applicationUserService = applicationUserService;
    }

    [HttpGet]
    public async Task<ActionResult<ApplicationUserDto>> GetById()
    {
        var userId = _userManager.GetUserId(User)!;

        var user = await _applicationUserService.GetByIdAsync(userId);

        return Ok(user);
    }

    [HttpPatch]
    public async Task<ActionResult> Update([FromBody] UpdateApplicationUserDto applicationUserDTO)
    {
        var userId = _userManager.GetUserId(User)!;

        var updatedUser = await _applicationUserService.UpdateAsync(userId, applicationUserDTO);

        return Ok(updatedUser);
    }
}
