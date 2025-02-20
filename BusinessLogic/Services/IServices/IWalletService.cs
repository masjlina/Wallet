using DataAccess.Entities;

namespace BusinessLogic.Services.IServices;

public interface IWalletService
{ 
      Task<Wallet?> GetByIdAsync(int walletId);
      Task<IEnumerable<Wallet>> GetAllAsync(Wallet wallet);
      Task AddAsync(Wallet wallet);
      Task UpdateAsync(Wallet wallet);
      Task RemoveAsync(Wallet wallet);
}