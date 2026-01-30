using BusinessLogic.Dtos;

namespace BusinessLogic.Services.IServices;

public interface IWalletService
{
    Task<WalletDto?> GetByUserIdAsync(string userId);
    Task<WalletDto> CreateAsync(WalletDto dto);
    Task<WalletDto> RenameAsync(int walletId, string newName);
    Task RemoveAsync(int id);
}