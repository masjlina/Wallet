using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class TransactionService : GenericService<Transaction, TransactionDTO, int>, IGenericService<TransactionDTO, int>
{
    public TransactionService(ApplicationDbContext dbContext, IMapper<Transaction, TransactionDTO> mapper) : base(dbContext, mapper)
    {
    }
}