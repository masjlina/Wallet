using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
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
        var wallet = await _dbContext.Wallets.FindAsync(walletId);
        
        return wallet?.ToWalletDTO();
    }

    public async Task<IEnumerable<WalletDTO>> GetAllAsync()
    {
        var wallets = await _dbContext.Wallets.ToListAsync();
        return wallets.Select(i => i.ToWalletDTO());
    }

    public async Task<bool> AddAsync(WalletDTO wallet)
    {
        var existingWallet = await _dbContext.Wallets.FindAsync(wallet.Id);
        if (existingWallet is not null)
        {
            return false;
        }
        
        await _dbContext.Wallets.AddAsync(wallet.ToWallet());
        await _dbContext.SaveChangesAsync();
        
        return true;
    }

    public async Task<bool> UpdateAsync(WalletDTO wallet)
    {
        var existingWallet = await _dbContext.Wallets.FindAsync(wallet.Id);
        if (existingWallet is null)
        {
            return false;
        }

        _dbContext.Entry(existingWallet).CurrentValues.SetValues(wallet.ToWallet());
        await _dbContext.SaveChangesAsync();
        
        return true;
    }

    public async Task<bool> RemoveAsync(int walletId)
    {
        Wallet? wallet = await _dbContext.Wallets.FindAsync(walletId);
        if (wallet is null)
        {
            return false;
        }
        
        _dbContext.Wallets.Remove(wallet);
        await _dbContext.SaveChangesAsync();

        return true;
    }
}