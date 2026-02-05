using BusinessLogic.Dtos;
using BusinessLogic.Services.IServices;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/credit-cards")]
public class CreditCardController : ControllerBase
{
    private readonly ICreditCardService _creditCardService;
    private readonly UserManager<ApplicationUser> _userManager;

    public CreditCardController(ICreditCardService creditCardService, UserManager<ApplicationUser> userManager)
    {
        _creditCardService = creditCardService;
        _userManager = userManager;
    }

    [HttpGet("{creditCardId}")]
    public async Task<ActionResult<CreditCardDto>> GetById([FromRoute] int creditCardId)
    {
        var userId = _userManager.GetUserId(User)!;

        return Ok(await _creditCardService.GetByIdAsync(userId, creditCardId));
    }

    [HttpGet]
    public async Task<ActionResult<List<CreditCardDto>>> GetAll()
    {
        var userId = _userManager.GetUserId(User)!;

        return Ok((await _creditCardService.GetAllAsync(userId)).ToList());
    }

    [HttpPost]
    public async Task<ActionResult<CreditCardDto>> Create([FromBody] CreditCardDto creditCardDto)
    {
        var userId = _userManager.GetUserId(User)!;
        
        CreditCardDto createdCreditCard = await _creditCardService.CreateAsync(userId, creditCardDto);

        return CreatedAtAction(
            nameof(GetById),
            new { creditCardId = createdCreditCard.Id },
            createdCreditCard
        );
    }

    [HttpDelete("{creditCardId}")]
    public async Task<ActionResult> Remove([FromRoute] int creditCardId)
    {
        var userId = _userManager.GetUserId(User)!;
        
        await _creditCardService.RemoveAsync(userId, creditCardId);
        return NoContent();
    }
}