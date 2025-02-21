using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public static class CreditCardMapper
{
    public static CreditCardDTO ToCreditCardDTO(this CreditCard creditCard)
    {
        return new CreditCardDTO()
        {
            Id = creditCard.Id,
            Name = creditCard.Name,
            WalletDto = creditCard.Wallet.ToWalletDTO(),
            Balance = creditCard.Balance,
            CreatedAt = creditCard.CreatedAt,
            UpdatedAt = creditCard.UpdatedAt,
            TransactionIds = new List<int>(creditCard.TransactionIds),
        };
    }
    
    public static CreditCard ToCreditCard(this CreditCardDTO creditCardDTO)
    {
        return new CreditCard()
        {
            Id = creditCardDTO.Id,
            Name = creditCardDTO.Name,
            Balance = creditCardDTO.Balance,
            CreatedAt = creditCardDTO.CreatedAt,
            UpdatedAt = creditCardDTO.UpdatedAt,
            TransactionIds = new List<int>(creditCardDTO.TransactionIds)
        };
    }
}