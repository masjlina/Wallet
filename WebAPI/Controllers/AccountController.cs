using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Services;

namespace WebAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IMapper<ApplicationUser, ApplicationUserDTO> _userMapper;
    private readonly ITokenService _tokenService;
    private readonly ApplicationDbContext _dbContext;

    public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMapper<ApplicationUser, ApplicationUserDTO> userMapper, ITokenService tokenService, ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _userMapper = userMapper;
        _tokenService = tokenService;
        _dbContext = dbContext;
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
            var authenticatedUser = await _userManager.FindByEmailAsync(signInRequestDTO.Email);

            return Ok(new SignInResponseDTO
            {
                ApplicationUserDTO = _userMapper.ToDTO(authenticatedUser),
                IsSignInSuccessful = true
            });
        }
        
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

        var userClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("Id", user.Id)
        };
        
        string accessToken = _tokenService.GenerateAccessToken(userClaims);
        string refreshToken = _tokenService.GenerateRefreshToken();

        var tokenInfo = _dbContext.TokenInfos.FirstOrDefault(a => a.UserId == user.Id);

        if (tokenInfo == null)
        {
            var ti = new TokenInfo
            {
                UserId = user.Id,
                RefreshToken = refreshToken,
                ExpiredAt = DateTime.UtcNow.AddDays(7)
            };
            _dbContext.TokenInfos.Add(ti);
        }
        else
        {
            tokenInfo.RefreshToken = refreshToken;
            tokenInfo.ExpiredAt = DateTime.UtcNow.AddDays(7);
        }

        await _dbContext.SaveChangesAsync();
        
        return Ok(new SignInResponseDTO
        {
            ApplicationUserDTO = _userMapper.ToDTO(user),
            IsSignInSuccessful = true,
            AccessToken = accessToken,
            RefreshToken = refreshToken
        });
    }
    
    [HttpPut]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequestDTO signUpRequestDTO)
    {
        if (signUpRequestDTO == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userExist = await _userManager.FindByEmailAsync(signUpRequestDTO.Email);

        if (userExist != null)
        {
            return BadRequest(new SignUpResponseDTO
            {
                IsRegistrationSuccessful = false,
                Errors = new[] { "User already exists" }
            });
        }
        
        var user = new ApplicationUser()
        {
            UserName = signUpRequestDTO.Name,
            Email = signUpRequestDTO.Email,
            EmailConfirmed = true,
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
        
        return Ok(StatusCodes.Status201Created);
    }

    [HttpPost]
    public async Task<IActionResult> Refresh(TokenModel tokenModel)
    {
        var principal = _tokenService.GetPrincipalFromExpiredToken(tokenModel.AccessToken);
        var userId = principal.FindFirst("Id").Value;

        var tokenInfo = _dbContext.TokenInfos.SingleOrDefault(u => u.UserId == userId);
        if (tokenInfo == null 
            || tokenInfo.RefreshToken != tokenModel.RefreshToken
            || tokenInfo.ExpiredAt <= DateTime.UtcNow)
        {
            return BadRequest("Invalid refresh token. Please login again.");
        }

        var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
        var newRefreshToken = _tokenService.GenerateRefreshToken();

        tokenInfo.RefreshToken = newRefreshToken;
        await _dbContext.SaveChangesAsync();

        return Ok(new TokenModel()
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        });
    }
}


