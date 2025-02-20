using DataAccess.Entities;

namespace BusinessLogic.Services.IServices;

public interface ITransactionService
{ 
      Task<Transaction?> GetByIdAsync(int transactionId);
      Task<IEnumerable<Transaction>> GetAllAsync(Transaction transaction);
      Task AddAsync(Transaction transaction);
      Task UpdateAsync(Transaction transaction);
      Task RemoveAsync(Transaction transaction);
}