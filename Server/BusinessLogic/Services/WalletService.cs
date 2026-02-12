using System.Net;
using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using BusinessLogic.Exceptions;
using BusinessLogic.helpers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class WalletService : IWalletService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<Wallet, WalletDto> _mapper;

    public WalletService(ApplicationDbContext dbContext, IMapper<Wallet, WalletDto> mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<WalletDto> GetByUserIdAsync(string userId)
    {
        var wallet = await _dbContext.Wallets
            .Include(w => w.CreditCards)
            .FirstOrDefaultAsync(w => w.ApplicationUserId == userId);

        if (wallet is null)
            throw new BusinessException(
                "Wallet was not found",
                HttpStatusCode.NotFound
            );

        return _mapper.ToDto(wallet);
    }


    public async Task<WalletDto> CreateAsync(WalletDto walletDto)
    {
        Wallet walletToCreate = _mapper.ToEntity(walletDto);

        Wallet createdWallet = _dbContext.Add(walletToCreate).Entity;
        await _dbContext.SaveChangesAsync();
        return _mapper.ToDto(createdWallet);
    }

    public async Task<WalletDto> UpdateAsync(string userId, int walletId, UpdateWalletDto dto)
    {
        var walletToUpdate = await _dbContext.Wallets
            .FirstOrDefaultAsync(w =>
                w.Id == walletId &&
                w.ApplicationUserId == userId);

        if (walletToUpdate is null)
            throw new BusinessException("Wallet was not found", HttpStatusCode.NotFound);

        if (dto.Name is not null)
            walletToUpdate.Name = dto.Name;

        if (dto.Balance.HasValue)
            walletToUpdate.Cash = dto.Balance.Value;

        await _dbContext.SaveChangesAsync();

        return _mapper.ToDto(walletToUpdate);
    }

    public async Task RemoveAsync(int id)
    {
        Wallet walletToDelete = await _dbContext.Wallets.FirstOrDefaultAsync(i => i.Id == id);

        if (walletToDelete is null)
        {
            throw new BusinessException("Wallet was not found", HttpStatusCode.NotFound);
        }

        _dbContext.Wallets.Remove(walletToDelete);
        await _dbContext.SaveChangesAsync();
    }
}