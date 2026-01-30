using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class TransactionService : GenericService<Transaction, TransactionDto>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<Transaction, TransactionDto> _mapper;
    public TransactionService(ApplicationDbContext dbContext, IMapper<Transaction, TransactionDto> mapper) : base(dbContext, mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    public override async Task<TransactionDto?> GetByIdAsync(int transactionId)
    {
        var transaction = await _dbContext.Set<Transaction>()
            .Include(e => e.Wallet)
            .Include(e => e.CreditCard)
            .Include(e => e.Category)
            .FirstOrDefaultAsync(i => i.Id == transactionId);
        return transaction != null ? _mapper.ToDto(transaction) : null;
    }

    public override async Task<IEnumerable<TransactionDto>> GetAllAsync()
    {
        var transactions = await _dbContext.Set<Transaction>()
            .ToListAsync();
        return transactions.Select(u => _mapper.ToDto(u));
    }
}