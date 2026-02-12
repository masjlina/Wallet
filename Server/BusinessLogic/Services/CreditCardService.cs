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
        var creditCard = await _dbContext.CreditCards
            .AsNoTracking()
            .Where(cc => cc.Id == creditCardId)
            .Join(
                _dbContext.Wallets,
                cc => cc.WalletId,
                w => w.Id,
                (cc, w) => new { CreditCard = cc, Wallet = w }
            )
            .Where(x => x.Wallet.ApplicationUserId == userId)
            .Select(x => x.CreditCard)
            .FirstOrDefaultAsync();


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
        var creditCards = await _dbContext.CreditCards
            .AsNoTracking()
            .Join(
                _dbContext.Wallets,
                cc => cc.WalletId,
                w => w.Id,
                (cc, w) => new { CreditCard = cc, Wallet = w }
            )
            .Where(x => x.Wallet.ApplicationUserId == userId)
            .Select(x => x.CreditCard)
            .ToListAsync();


        return creditCards
            .Select(cc => _mapper.ToDto(cc))
            .ToList();
    }

    public async Task<CreditCardDto> CreateAsync(string userId, CreditCardDto dto)
    {
        Wallet wallet = await CheckOwnership.GetWalletByUserId(userId, _dbContext);

        dto.WalletId = wallet.Id;
        CreditCard creditCardToCreate = _mapper.ToEntity(dto);

        CreditCard createdCreditCard = _dbContext.Add(creditCardToCreate).Entity;
        await _dbContext.SaveChangesAsync();
        return _mapper.ToDto(createdCreditCard);
    }

    public async Task<CreditCardDto> UpdateAsync(string userId, int creditCardId, UpdateCreditCardDto dto)
    {
        var creditCardToUpdate = await _dbContext.CreditCards
            .FirstOrDefaultAsync(cc =>
                cc.Id == creditCardId &&
                cc.Wallet.ApplicationUserId == userId
            );

        if (creditCardToUpdate is null)
            throw new BusinessException("Account was not found", HttpStatusCode.NotFound);

        if (dto.Name is not null)
            creditCardToUpdate.Name = dto.Name;

        if (dto.Balance.HasValue)
            creditCardToUpdate.Balance = dto.Balance.Value;

        creditCardToUpdate.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return _mapper.ToDto(creditCardToUpdate);
    }

    public async Task RemoveAsync(string userId, int creditCardId)
    {
        Wallet wallet = await CheckOwnership.GetWalletByUserId(userId, _dbContext);
        var affectedRows = await _dbContext.CreditCards
            .Where(cc => cc.Id == creditCardId && cc.WalletId == wallet.Id)
            .ExecuteDeleteAsync();

        if (affectedRows == 0)
            throw new BusinessException("Credit card was not found", HttpStatusCode.NotFound);
    }
}