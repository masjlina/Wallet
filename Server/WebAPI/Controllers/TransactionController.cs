using BusinessLogic.Dtos;
using BusinessLogic.Services.IServices;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;
    private readonly UserManager<ApplicationUser> _userManager;

    public TransactionController(UserManager<ApplicationUser> userManager, ITransactionService transactionService)
    {
        _userManager = userManager;
        _transactionService = transactionService;
    }

    [HttpGet("{transactionId}")]
    public async Task<ActionResult<TransactionDto>> GetById([FromRoute] int transactionId)
    {
        var userId = _userManager.GetUserId(User)!;

        return Ok(await _transactionService.GetByIdAsync(userId, transactionId));
    }

    [HttpGet]
    public async Task<ActionResult<List<TransactionDto>>> GetAll()
    {
        var userId = _userManager.GetUserId(User)!;

        return Ok(await _transactionService.GetAllAsync(userId));
    }

    [HttpPost]
    public async Task<ActionResult<TransactionDto>> Create([FromBody] TransactionDto dto)
    {
        var userId = _userManager.GetUserId(User)!;

        TransactionDto createdTransaction = await _transactionService.CreateAsync(userId, dto);

        return CreatedAtAction(
            nameof(GetById),
            new { transactionId = createdTransaction.Id },
            createdTransaction
        );
    }

    [HttpDelete("{transactionId}")]
    public async Task<ActionResult> Remove([FromRoute] int transactionId)
    {
        var userId = _userManager.GetUserId(User)!;

        await _transactionService.RemoveAsync(userId, transactionId);

        return NoContent();
    }
}