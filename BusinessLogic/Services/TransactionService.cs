using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class TransactionService : ITransactionService
{
    private readonly ApplicationDbContext _dbContext;

    public TransactionService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
      
    public async Task<TransactionDTO?> GetByIdAsync(int transactionId)
    {
        var transaction = await _dbContext.Transactions.FirstOrDefaultAsync(i =>  i.Id == transactionId);

        if (transaction == null)
        {
            return new TransactionDTO();
        }
        
        return transaction.ToTransactionDTO();
    }

    public async Task<IEnumerable<TransactionDTO>> GetAllAsync()
    {
        var transactions = await _dbContext.Transactions.ToListAsync();

        if (transactions == null)
        {
            return new List<TransactionDTO>();
        }
        
        return transactions.Select(i => i.ToTransactionDTO());
    }

    public async Task AddAsync(TransactionDTO transactionDTO)
    {
        await _dbContext.Transactions.AddAsync(transactionDTO.ToTransaction());
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(TransactionDTO transactionDTO)
    {
        _dbContext.Transactions.Update(transactionDTO.ToTransaction());
        await _dbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(TransactionDTO transactionDTO)
    {
        _dbContext.Transactions.Remove(transactionDTO.ToTransaction());
        await _dbContext.SaveChangesAsync();
    }
}