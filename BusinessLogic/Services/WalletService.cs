using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class WalletService : IWalletService
{
    private readonly ApplicationDbContext _dbContext;

    public WalletService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
      
    public async Task<WalletDTO?> GetByIdAsync(int walletId)
    {
        var wallet = await _dbContext.Wallets.FirstOrDefaultAsync(i =>  i.Id == walletId);

        if (wallet == null)
        {
            return new WalletDTO();
        }
        
        return wallet.ToWalletDTO();
    }

    public async Task<IEnumerable<WalletDTO>> GetAllAsync()
    {
        var wallets = await _dbContext.Wallets.ToListAsync();

        if (wallets == null)
        {
            return new List<WalletDTO>();
        }
        
        return wallets.Select(i => i.ToWalletDTO());
    }

    public async Task AddAsync(WalletDTO wallet)
    {
        await _dbContext.Wallets.AddAsync(wallet.ToWallet());
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(WalletDTO wallet)
    {
        _dbContext.Wallets.Update(wallet.ToWallet());
        await _dbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(WalletDTO wallet)
    {
        _dbContext.Wallets.Remove(wallet.ToWallet());
        await _dbContext.SaveChangesAsync();
    }
}