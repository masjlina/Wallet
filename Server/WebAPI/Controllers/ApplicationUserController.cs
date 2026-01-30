using BusinessLogic.Dtos;
using BusinessLogic.Services.IServices;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Controllers.IControllers;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/applicationUsers")]
public class ApplicationUserController : ControllerBase, IApplicationUserController
{
    private readonly IApplicationUserService _applicationUserService;

    public ApplicationUserController(IApplicationUserService applicationUserService)
    {
        _applicationUserService = applicationUserService;
    }
    [Authorize("IsAdmin")]
    [HttpGet("{applicationUserId}")]
    public async Task<ActionResult<ApplicationUserDto>> GetById(string applicationUserId)
    {
        ApplicationUserDto? applicationUserDTO = await _applicationUserService.GetByIdAsync(applicationUserId);

        if (applicationUserDTO == null)
        {
            return NotFound();
        }

        return Ok(applicationUserDTO);
    }
        
    [HttpPatch("{applicationUserDTO.Id}")]
    public async Task<ActionResult> Update([FromBody]ApplicationUserDto applicationUserDTO)
    {
        await _applicationUserService.UpdateAsync(applicationUserDTO);
        return Ok();
    }
}