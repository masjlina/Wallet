using BusinessLogic.DTOs;
using BusinessLogic.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class TransactionController : GenericController<TransactionDTO>
{
    public TransactionController(IGenericService<TransactionDTO> transactionService) : base(transactionService)
    {
    }
}