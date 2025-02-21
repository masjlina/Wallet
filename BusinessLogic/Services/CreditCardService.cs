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
        var creditCard = await _dbContext.CreditCards.FirstOrDefaultAsync(i =>  i.Id == creditCardId);

        if (creditCard == null)
        {
            return new CreditCardDTO();
        }
        
        return creditCard.ToCreditCardDTO();
    }

    public async Task<IEnumerable<CreditCardDTO>> GetAllAsync()
    {
        var creditCards = await _dbContext.CreditCards.ToListAsync();

        if (creditCards == null)
        {
            return new List<CreditCardDTO>();
        }
        
        return creditCards.Select(i => i.ToCreditCardDTO());
    }

    public async Task AddAsync(CreditCardDTO creditCardDTO)
    {
        await _dbContext.CreditCards.AddAsync(creditCardDTO.ToCreditCard());
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(CreditCardDTO creditCardDTO)
    {
        _dbContext.CreditCards.Update(creditCardDTO.ToCreditCard());
        await _dbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(CreditCardDTO creditCardDTO)
    {
        _dbContext.CreditCards.Remove(creditCardDTO.ToCreditCard());
        await _dbContext.SaveChangesAsync();
    }
}