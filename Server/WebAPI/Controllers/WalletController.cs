using BusinessLogic.DTOs;
using BusinessLogic.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/wallet")]
public class WalletController : ControllerBase
{
    private readonly IGenericService<WalletDTO> _walletService;

    public WalletController(IGenericService<WalletDTO> walletService)
    {
        _walletService = walletService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WalletDTO>>> Get(int id)
    {
        var walletDto = await _walletService.GetByIdAsync(id);

        return Ok(walletDto);
    }
}