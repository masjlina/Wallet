using DataAccess.Entities;

namespace BusinessLogic.Services.IServices;

public interface ICreditCardService
{ 
      Task<CreditCard?> GetByIdAsync(int creditCardId);
      Task<IEnumerable<CreditCard>> GetAllAsync(CreditCard creditCard);
      Task AddAsync(CreditCard creditCard);
      Task UpdateAsync(CreditCard creditCard);
      Task RemoveAsync(CreditCard creditCard);
}