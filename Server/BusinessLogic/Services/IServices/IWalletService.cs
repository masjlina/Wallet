using BusinessLogic.Dtos;

namespace BusinessLogic.Services.IServices;

public interface IWalletService
{
    Task<WalletDto?> GetByUserIdAsync(string userId);
    Task<WalletDto> CreateAsync(WalletDto dto);
    Task<WalletDto> UpdateAsync(string userId, int walletId, UpdateWalletDto dto);
    Task RemoveAsync(int id);
}