using BusinessLogic.DTOs;
using DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AccountController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPut]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequestDTO signUpRequestDTO)
    {
        var user = new ApplicationUser()
        {
            UserName = signUpRequestDTO.Email,
            Email = signUpRequestDTO.Email,
            PhoneNumber = signUpRequestDTO.Phone,
            EmailConfirmed = true,
            AvatarUri = signUpRequestDTO.AvatarUri
        };

        var result = await _userManager.CreateAsync(user, signUpRequestDTO.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new SignUpResponseDTO()
            {
                IsRegistrationSuccessful = false,
                Errors = result.Errors.Select(u => u.Description)
            });
        }

        return StatusCode(StatusCodes.Status201Created);
    }
}