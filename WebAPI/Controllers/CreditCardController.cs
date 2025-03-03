using BusinessLogic.DTOs;
using BusinessLogic.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/creditCards")]
[ApiController]
public class CreditCardController : GenericController<CreditCardDTO>
{
    public CreditCardController(IGenericService<CreditCardDTO> credirCardService) : base(credirCardService)
    {
    }
}
