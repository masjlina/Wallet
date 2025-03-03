using BusinessLogic.DTOs;
using BusinessLogic.Services.IServices;
using BusinessLogic.Services;
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

    [HttpGet("{applicationUserId}")]
    public async Task<ActionResult<ApplicationUserDTO>> GetById(string applicationUserId)
    {
        ApplicationUserDTO? applicationUserDTO = await _applicationUserService.GetByIdAsync(applicationUserId);

        if (applicationUserDTO == null)
        {
            return NotFound();
        }

        return Ok(applicationUserDTO);
    }
        
    [HttpPatch]
    public async Task<ActionResult> Update([FromBody]ApplicationUserDTO applicationUserDTO)
    {
        await _applicationUserService.UpdateAsync(applicationUserDTO);
        return Ok();
    }
}