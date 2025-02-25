using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CreditCardService : ICreditCardService
{
    private readonly ApplicationDbContext _dbContext;

    public CreditCardService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
      
    public async Task<CreditCardDTO?> GetByIdAsync(int creditCardId)
    {
        var creditCard = await _dbContext.CreditCards.FindAsync(creditCardId);
        return creditCard?.ToCreditCardDTO();
    }

    public async Task<IEnumerable<CreditCardDTO>> GetAllAsync()
    {
        var creditCards = await _dbContext.CreditCards.ToListAsync();
        return creditCards.Select(i => i.ToCreditCardDTO());
    }

    public async Task<bool> AddAsync(CreditCardDTO creditCardDTO)
    {
        var existingCreditCard = await _dbContext.CreditCards.FindAsync(creditCardDTO.Id);
        if (existingCreditCard is not null)
        {
            return false;
        }
        
        await _dbContext.CreditCards.AddAsync(creditCardDTO.ToCreditCard());
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateAsync(CreditCardDTO creditCardDTO)
    {
        var existingCreditCard = await _dbContext.CreditCards.FindAsync(creditCardDTO.Id);
        if (existingCreditCard is null)
        {
            return false;
        }

        _dbContext.Entry(existingCreditCard).CurrentValues.SetValues(creditCardDTO.ToCreditCard());
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveAsync(int creditCardId)
    {
        var creditCard = await _dbContext.CreditCards.FindAsync(creditCardId);
        if (creditCard is null)
        {
            return false;
        }

        _dbContext.CreditCards.Remove(creditCard);
        await _dbContext.SaveChangesAsync();

        return true;
    }
}
