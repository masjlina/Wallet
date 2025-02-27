using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CreditCardService : GenericService<CreditCard, CreditCardDTO>
{
    public CreditCardService(ApplicationDbContext dbContext, IMapper<CreditCard, CreditCardDTO> mapper) : base(dbContext, mapper)
    {
    }
}
