using System.Security.Claims;
using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services;

namespace WebAPI.Controllers;

[ApiController]
[Route("api")]
public class AccountController(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    IMapper<ApplicationUser, ApplicationUserDto> userMapper,
    ITokenService tokenService,
    ApplicationDbContext dbContext)
    : ControllerBase
{
    private const int DefaultRefreshTokenLifetimeDays = 1;
    private const int RememberMeRefreshTokenLifetimeDays = 30;

    [HttpPost]
    [Route("sign-in")]
    public async Task<IActionResult> SignIn([FromBody] SignInRequestDto? signInRequestDto)
    {
        if (signInRequestDto == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await userManager.FindByEmailAsync(signInRequestDto.Email);
        if (user == null)
        {
            return Unauthorized(new ErrorResponse
            {
                Errors = ["Invalid email or password"]
            });
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, signInRequestDto.Password, false);
        if (!result.Succeeded)
        {
            return Unauthorized(new ErrorResponse
            {
                Errors = ["Invalid email or password"]
            });
        }

        var userClaims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
            new Claim(ClaimTypes.Name, user.UserName ?? user.Email ?? user.Id)
        };

        string accessToken = tokenService.GenerateAccessToken(userClaims);
        string refreshToken = tokenService.GenerateRefreshToken();
        var refreshTokenExpiration = GetRefreshTokenExpiration(signInRequestDto.RememberMe);

        var tokenInfo = await dbContext.TokenInfos.FirstOrDefaultAsync(a => a.UserId == user.Id);

        if (tokenInfo == null)
        {
            var ti = new TokenInfo
            {
                UserId = user.Id,
                RefreshToken = refreshToken,
                ExpiredAt = refreshTokenExpiration.UtcDateTime
            };
            dbContext.TokenInfos.Add(ti);
        }
        else
        {
            tokenInfo.RefreshToken = refreshToken;
            tokenInfo.ExpiredAt = refreshTokenExpiration.UtcDateTime;
        }

        await dbContext.SaveChangesAsync();

        Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = refreshTokenExpiration,
            Path = "/"
        });


        return Ok(new SignInResponseDto
        {
            User = userMapper.ToDto(user),
            AccessToken = accessToken
        });
    }

    [HttpPost]
    [Route("sign-up")]
    public async Task<IActionResult> SignUp([FromBody] SignUpRequestDto signUpRequestDto)
    {
        if (signUpRequestDto == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userExist = await userManager.FindByEmailAsync(signUpRequestDto.Email);

        if (userExist != null)
        {
            return Conflict(new ErrorResponse
            {
                Errors = ["User already exists"]
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

        var result = await userManager.CreateAsync(user, signUpRequestDto.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new ErrorResponse
            {
                Errors = result.Errors.Select(u => u.Description)
            });
        }

        return Created();
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        if (Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
        {
            var userId = userManager.GetUserId(User);
            if (!string.IsNullOrWhiteSpace(userId))
            {
                await dbContext.TokenInfos
                    .Where(t => t.UserId == userId && t.RefreshToken == refreshToken)
                    .ExecuteDeleteAsync();
            }
        }

        await signInManager.SignOutAsync();

        Response.Cookies.Delete("refreshToken", new CookieOptions
        {
            Path = "/"
        });

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
                Errors = ["Id does not exist"]
            });

        var user = await userManager.FindByIdAsync(userId);
        if (user is null)
            return Unauthorized(new ErrorResponse
            {
                Errors = ["User does not exist"]
            });

        ApplicationUserDto applicationUserDto = userMapper.ToDto(user);

        return Ok(new CheckAuthResponseDto
        {
            ApplicationUserDto = applicationUserDto
        });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequestDto dto)
    {
        if (dto.NewPassword != dto.ConfirmPassword)
        {
            return BadRequest(new ErrorResponse()
            {
                Errors = ["New and Confirmation password are not the same"]
            });
        }

        var userId = userManager.GetUserId(User)!;

        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return Unauthorized(new ErrorResponse
            {
                Errors = ["Could not find user"]
            });
        }

        var result = await userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);
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

        var tokenInfo = await dbContext.TokenInfos
            .SingleOrDefaultAsync(t =>
                t.RefreshToken == refreshToken &&
                t.ExpiredAt > DateTime.UtcNow);

        if (tokenInfo == null)
            return Unauthorized(new ErrorResponse
            {
                Errors = ["Invalid refresh token"]
            });

        var user = await userManager.FindByIdAsync(tokenInfo.UserId);
        if (user == null)
            return Unauthorized();

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
            new Claim(ClaimTypes.Name, user.UserName ?? user.Email ?? user.Id)
        };

        var newAccessToken = tokenService.GenerateAccessToken(claims);
        var newRefreshToken = tokenService.GenerateRefreshToken();

        tokenInfo.RefreshToken = newRefreshToken;

        await dbContext.SaveChangesAsync();

        Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = tokenInfo.ExpiredAt,
            Path = "/"
        });

        return Ok(new RefreshResponseDto
        {
            AccessToken = newAccessToken
        });
    }

    private static DateTimeOffset GetRefreshTokenExpiration(bool rememberMe)
    {
        var lifetimeDays = rememberMe
            ? RememberMeRefreshTokenLifetimeDays
            : DefaultRefreshTokenLifetimeDays;

        return DateTimeOffset.UtcNow.AddDays(lifetimeDays);
    }
}
