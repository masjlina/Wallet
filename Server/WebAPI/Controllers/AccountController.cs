using System.Security.Claims;
using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services;

namespace WebAPI.Controllers;

[ApiController]
[Route("api")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IMapper<ApplicationUser, ApplicationUserDto> _userMapper;
    private readonly ITokenService _tokenService;
    private readonly ApplicationDbContext _dbContext;

    public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
        IMapper<ApplicationUser, ApplicationUserDto> userMapper, ITokenService tokenService,
        ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _userMapper = userMapper;
        _tokenService = tokenService;
        _dbContext = dbContext;
    }

    [HttpPost]
    [Route("signIn")]
    public async Task<IActionResult> SignIn([FromBody] SignInRequestDto? signInRequestDto)
    {
        if (signInRequestDto == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userManager.FindByEmailAsync(signInRequestDto.Email);
        if (user == null)
        {
            return Unauthorized(new ErrorResponse
            {
                Errors = new[] { "Invalid email or password" }
            });
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, signInRequestDto.Password, false);
        if (!result.Succeeded)
        {
            return Unauthorized(new ErrorResponse
            {
                Errors = new[] { "Invalid email or password" }
            });
        }

        var userClaims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName ?? user.Email)
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
                ExpiredAt = DateTime.UtcNow.AddDays(signInRequestDto.RememberMe ? 30 : 1)
            };
            _dbContext.TokenInfos.Add(ti);
        }
        else
        {
            tokenInfo.RefreshToken = refreshToken;
            tokenInfo.ExpiredAt =
                signInRequestDto.RememberMe ? DateTime.UtcNow.AddDays(30) : DateTime.UtcNow.AddDays(7);
        }

        await _dbContext.SaveChangesAsync();

        Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = signInRequestDto.RememberMe
                ? DateTimeOffset.UtcNow.AddDays(30)
                : DateTimeOffset.UtcNow.AddDays(1),
            Path = "/"
        });


        return Ok(new SignInResponseDto
        {
            ApplicationUserDto = _userMapper.ToDto(user),
            AccessToken = accessToken
        });
    }

    [HttpPost]
    [Route("signUp")]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequestDto signUpRequestDto)
    {
        if (signUpRequestDto == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userExist = await _userManager.FindByEmailAsync(signUpRequestDto.Email);

        if (userExist != null)
        {
            return Conflict(new ErrorResponse
            {
                Errors = new[] { "User already exists" }
            });
        }

        var user = new ApplicationUser()
        {
            FirstName = signUpRequestDto.FirstName,
            LastName = signUpRequestDto.LastName,
            UserName = signUpRequestDto.Email,
            Email = signUpRequestDto.Email,
            EmailConfirmed = true,
        };

        var result = await _userManager.CreateAsync(user, signUpRequestDto.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new ErrorResponse
            {
                Errors = result.Errors.Select(u => u.Description)
            });
        }

        return Ok(StatusCodes.Status201Created);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (refreshToken != null)
        {
            await _signInManager.SignOutAsync();
        }

        Response.Cookies.Delete("refreshToken");

        return Ok();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> CheckAuth()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized(new ErrorResponse
            {
                Errors = new[] { "Id does not exist" }
            });

        var user = await _userManager.FindByIdAsync(userId);
        if (user is null)
            return Unauthorized(new ErrorResponse
            {
                Errors = new[] { "User does not exist" }
            });

        ApplicationUserDto applicationUserDto = _userMapper.ToDto(user);

        return Ok(new CheckAuthResponseDto
        {
            ApplicationUserDto = applicationUserDto
        });
    }

    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequestDto dto)
    {
        if (dto.NewPassword != dto.ConfirmPassword)
        {
            return BadRequest(new ErrorResponse()
            {
                Errors = new[] { "New and Confirmation password are not the same" }
            });
        }

        var userId = _userManager.GetUserId(User)!;

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return Unauthorized(new ErrorResponse
            {
                Errors = new[] { "Could not find user" }
            });
        }

        var result = await _userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);
        if (!result.Succeeded)
        {
            return BadRequest(new ErrorResponse
            {
                Errors = result.Errors.Select(e => e.Description)
            });
        }

        return Ok();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            return Unauthorized("Refresh token missing");

        var tokenInfo = await _dbContext.TokenInfos
            .SingleOrDefaultAsync(t =>
                t.RefreshToken == refreshToken &&
                t.ExpiredAt > DateTime.UtcNow);

        Console.WriteLine("refresh token from request: " + refreshToken);

        if (tokenInfo == null)
            return Unauthorized(new ErrorResponse
            {
                Errors = new[] { "Invalid refresh token" }
            });

        var user = await _userManager.FindByIdAsync(tokenInfo.UserId);
        if (user == null)
            return Unauthorized();

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName ?? user.Email)
        };

        var newAccessToken = _tokenService.GenerateAccessToken(claims);
        var newRefreshToken = _tokenService.GenerateRefreshToken();

        tokenInfo.RefreshToken = newRefreshToken;
        tokenInfo.ExpiredAt = DateTime.UtcNow.AddDays(7);

        await _dbContext.SaveChangesAsync();

        Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = tokenInfo.ExpiredAt,
            Path = "/"
        });

        return Ok(new RefreshResponseDto
        {
            AccessToken = newAccessToken
        });
    }
}