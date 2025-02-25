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
        var transaction = await _dbContext.Transactions.FindAsync(transactionId);
        return transaction?.ToTransactionDTO();
    }

    public async Task<IEnumerable<TransactionDTO>> GetAllAsync()
    {
        var transactions = await _dbContext.Transactions.ToListAsync();
        return transactions.Select(i => i.ToTransactionDTO());
    }

    public async Task<bool> AddAsync(TransactionDTO transactionDTO)
    {
        var existingTransaction = await _dbContext.Transactions.FindAsync(transactionDTO.Id);
        if (existingTransaction is not null)
        {
            return false;
        }

        await _dbContext.Transactions.AddAsync(transactionDTO.ToTransaction());
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateAsync(TransactionDTO transactionDTO)
    {
        var existingTransaction = await _dbContext.Transactions.FindAsync(transactionDTO.Id);
        if (existingTransaction is null)
        {
            return false;
        }

        _dbContext.Entry(existingTransaction).CurrentValues.SetValues(transactionDTO.ToTransaction());
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveAsync(int transactionId)
    {
        var transaction = await _dbContext.Transactions.FindAsync(transactionId);
        if (transaction is null)
        {
            return false;
        }

        _dbContext.Transactions.Remove(transaction);
        await _dbContext.SaveChangesAsync();

        return true;
    }

}