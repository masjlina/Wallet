using BusinessLogic.DTOs;
using BusinessLogic.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class WalletController : GenericController<WalletDTO>
{
    public WalletController(IGenericService<WalletDTO> walletService) : base(walletService)
    {
    }
}