using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class TransactionService : GenericService<Transaction, TransactionDTO>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<Transaction, TransactionDTO> _mapper;
    public TransactionService(ApplicationDbContext dbContext, IMapper<Transaction, TransactionDTO> mapper) : base(dbContext, mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    public override async Task<TransactionDTO?> GetByIdAsync(int transactionId)
    {
        var transaction = await _dbContext.Set<Transaction>()
            .Include(e => e.Wallet)
            .Include(e => e.CreditCard)
            .Include(e => e.Category)
            .FirstOrDefaultAsync(i => i.Id == transactionId);
        return transaction != null ? _mapper.ToDTO(transaction) : null;
    }

    public override async Task<IEnumerable<TransactionDTO>> GetAllAsync()
    {
        var transactions = await _dbContext.Set<Transaction>()
            .ToListAsync();
        return transactions.Select(u => _mapper.ToDTO(u));
    }
}