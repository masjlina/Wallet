using BusinessLogic.Dtos;

namespace BusinessLogic.Services.IServices;

public interface ITransactionService
{
    Task<TransactionDto> GetByIdAsync(string userId, int transactionId);
    Task<IReadOnlyList<TransactionDto>> GetAllAsync(string userId);
    Task<TransactionDto> CreateAsync(string userId, TransactionDto dto);
    Task<TransactionDto> UpdateAsync(string userId, int transactionId, UpdateTransactionDto dto);
    Task RemoveAsync(string userId, int transactionId);
}