using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly ApiSettings _apiSettings;
    private readonly IMapper<ApplicationUser, ApplicationUserDTO> _userMapper;

    //TODO: 1. create token service. see in medium site 2. 
    public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, IOptions<ApiSettings> options)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _apiSettings = options.Value;
    }

    [HttpPost]
    public async Task<IActionResult> SignIn([FromBody] SignInRequestDTO? signInRequestDTO)
    {
      
        if (signInRequestDTO == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (HttpContext.User.Identity.IsAuthenticated)
        {
            return Ok(new SignInResponseDTO
            {
                IsSignInSuccessful = true
            });
        }
        
        var test = HttpContext.Request.Headers;
        var user = await _userManager.FindByEmailAsync(signInRequestDTO.Email);
        if (user == null)
        {
            return Unauthorized(new SignInResponseDTO
            {
                IsSignInSuccessful = false,
                Errors = new[] { "Invalid email or password" }
            });
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, signInRequestDTO.Password, false);
        if (!result.Succeeded)
        {
            return Unauthorized(new SignInResponseDTO
            {
                IsSignInSuccessful = false,
                Errors = new []{"Invalid email or password"}
            });
        }

        var signInCredentials = GetSigningCredentials();
        var claims = await GetClaims(user);

        var tokenOptions = new JwtSecurityToken(
            issuer: _apiSettings.ValidIssuer,
            // audience: _apiSettings.ValidAudience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: signInCredentials);

        var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        return Ok(new SignInResponseDTO
        {
            ApplicationUserDTO = _userMapper.ToDTO(user),
            IsSignInSuccessful = true,
            Token = token
        });
    }
    
    [HttpPut]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequestDTO signUpRequestDTO)
    {
        var user = new ApplicationUser()
        {
            UserName = signUpRequestDTO.UserName,
            Email = signUpRequestDTO.Email,
            EmailConfirmed = true
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

        await _signInManager.SignInAsync(user, false);
        // Add Redirect
        
        return StatusCode(StatusCodes.Status201Created);
    }
    
    private SigningCredentials GetSigningCredentials()
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_apiSettings.SigningKey));
        return new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
    }

    private async Task<List<Claim>> GetClaims(ApplicationUser user)
    {
        return new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("Id", user.Id)
        };
    }
    
}