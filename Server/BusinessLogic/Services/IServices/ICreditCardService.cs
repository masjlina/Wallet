using BusinessLogic.Dtos;

namespace BusinessLogic.Services.IServices;

public interface ICreditCardService
{
    Task<CreditCardDto> GetByIdAsync(string userId, int creditCardId);
    Task<IReadOnlyList<CreditCardDto>> GetAllAsync(string userId);
    Task<CreditCardDto> CreateAsync(string userId, CreditCardCreateRequestDto dto);
    Task<CreditCardDto> UpdateAsync(string userId, int creditCardId, UpdateCreditCardDto dto);
    Task RemoveAsync(string userId, int creditCardId);
}
