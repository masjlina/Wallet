using DataAccess.Entities;

namespace BusinessLogic.Dtos.Mappers;

public class CreditCardMapper : IMapper<CreditCard, CreditCardDto>
{
    private readonly IMapper<Transaction, TransactionDto> _transactionMapper;

    public CreditCardMapper(IMapper<Transaction, TransactionDto> transactionMapper)
    {
        _transactionMapper = transactionMapper;
    }
    
    public  CreditCardDto ToDto(CreditCard creditCard)
    {
        return new CreditCardDto()
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
    
    public  CreditCard ToEntity(CreditCardDto creditCardDto)
    {
        return new CreditCard()
        {
            Id = creditCardDto.Id,
            Name = creditCardDto.Name,
            Balance = creditCardDto.Balance,
            WalletId = creditCardDto.WalletId,
            TransactionIds = new List<int>(creditCardDto.TransactionIds ?? new List<int>()),
            CreatedAt = creditCardDto.CreatedAt,
            UpdatedAt = creditCardDto.UpdatedAt
        };
    }
}