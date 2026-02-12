using BusinessLogic.Dtos;
using BusinessLogic.Services.IServices;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/wallet")]
public class WalletController : ControllerBase
{
    private readonly IWalletService _walletService;
    private readonly UserManager<ApplicationUser> _userManager;

    public WalletController(IWalletService walletService, UserManager<ApplicationUser> userManager)
    {
        _walletService = walletService;
        _userManager = userManager;
    }
    
    [HttpGet]
    public async Task<ActionResult<WalletDto>> Get()
    {
        var userId = _userManager.GetUserId(User);

        var wallet = await _walletService.GetByUserIdAsync(userId);

        return Ok(wallet);
    }

    [HttpPost]
    public async Task<ActionResult<WalletDto>> CreateWallet([FromBody] WalletCreateRequestDto request)
    {
        var userId = _userManager.GetUserId(User);
        var walletToCreate = new WalletDto
        {
            ApplicationUserId = userId,
            Name = request.Name
        };

        WalletDto createdWallet = await _walletService.CreateAsync(walletToCreate);

        return CreatedAtAction(nameof(Get), createdWallet);
    }

    [HttpPatch("{walletId}")]
    public async Task<ActionResult<WalletDto>> UpdateAsync(int walletId, UpdateWalletDto dto)
    {
        string userId = _userManager.GetUserId(User);

        WalletDto updatedWallet = await _walletService.UpdateAsync(userId, walletId, dto);

        return Ok(updatedWallet);
    }

}