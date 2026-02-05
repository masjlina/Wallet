using System.Net;
using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using BusinessLogic.Exceptions;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CreditCardService : ICreditCardService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<CreditCard, CreditCardDto> _mapper;

    public CreditCardService(ApplicationDbContext dbContext, IMapper<CreditCard, CreditCardDto> mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<CreditCardDto> GetByIdAsync(string userId, int creditCardId)
    {
        Wallet wallet = await GetWalletByUserId(userId);

        CreditCard? creditCard = await _dbContext.CreditCards
            .FirstOrDefaultAsync(cc => cc.WalletId == wallet.Id && cc.Id == creditCardId);

        if (creditCard is null)
        {
            throw new BusinessException(
                "Credit card was not found",
                HttpStatusCode.NotFound);
        }

        return _mapper.ToDto(creditCard);
    }

    public async Task<IReadOnlyList<CreditCardDto>> GetAllAsync(string userId)
    {
        Wallet wallet = await GetWalletByUserId(userId);

        var creditCards = await _dbContext.CreditCards
            .Where(cc => cc.WalletId == wallet.Id)
            .ToListAsync();

        return creditCards
            .Select(cc => _mapper.ToDto(cc))
            .ToList();
    }

    public async Task<CreditCardDto> CreateAsync(string userId, CreditCardDto dto)
    {
        Wallet wallet = await GetWalletByUserId(userId);

        dto.WalletId = wallet.Id;
        CreditCard creditCardToCreate = _mapper.ToEntity(dto);

        CreditCard createdCreditCard = _dbContext.Add(creditCardToCreate).Entity;
        await _dbContext.SaveChangesAsync();
        return _mapper.ToDto(createdCreditCard);
    }

    public async Task RemoveAsync(string userId, int creditCardId)
    {
        Wallet wallet = await GetWalletByUserId(userId);
        var affectedRows = await _dbContext.CreditCards
            .Where(cc => cc.Id == creditCardId && cc.WalletId == wallet.Id)
            .ExecuteDeleteAsync();

        if (affectedRows == 0)
            throw new BusinessException("Credit card was not found", HttpStatusCode.NotFound);
    }

    private async Task<Wallet> GetWalletByUserId(string userId)
    {
        var wallet = await _dbContext.Wallets
            .FirstOrDefaultAsync(w => w.ApplicationUserId == userId);

        if (wallet is null)
            throw new BusinessException("Wallet was not found", HttpStatusCode.NotFound);

        return wallet;
    }
}