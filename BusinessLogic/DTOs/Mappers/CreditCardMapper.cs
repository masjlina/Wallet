using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public class CreditCardMapper : IMapper<CreditCard, CreditCardDTO>
{
    private readonly IMapper<Transaction, TransactionDTO> _transactionMapper;

    public CreditCardMapper(IMapper<Transaction, TransactionDTO> transactionMapper)
    {
        _transactionMapper = transactionMapper;
    }
    
    public  CreditCardDTO ToDTO(CreditCard creditCard)
    {
        return new CreditCardDTO()
        {
            Id = creditCard.Id,
            Name = creditCard.Name,
            Balance = creditCard.Balance,
            WalletId = creditCard.WalletId,
            TransactionIds = new List<int>(creditCard.TransactionIds ?? new List<int>()),
            CreatedAt = creditCard.CreatedAt,
            UpdatedAt = creditCard.UpdatedAt
        };
    }
    
    public  CreditCard ToEntity(CreditCardDTO creditCardDTO)
    {
        return new CreditCard()
        {
            Id = creditCardDTO.Id,
            Name = creditCardDTO.Name,
            Balance = creditCardDTO.Balance,
            WalletId = creditCardDTO.WalletId,
            TransactionIds = new List<int>(creditCardDTO.TransactionIds ?? new List<int>()),
            CreatedAt = creditCardDTO.CreatedAt,
            UpdatedAt = creditCardDTO.UpdatedAt
        };
    }
}