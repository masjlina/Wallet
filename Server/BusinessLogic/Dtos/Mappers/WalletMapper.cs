using BusinessLogic.Dtos.Mappers;
using DataAccess.Entities;

namespace BusinessLogic.Dtos.Mappers;

public class WalletMapper : IMapper<Wallet, WalletDto>
{
    private readonly IMapper<CreditCard, CreditCardDto> _creditCardMapper;
    
    public WalletMapper(IMapper<CreditCard, CreditCardDto> creditCardMapper)
    {
        _creditCardMapper = creditCardMapper;
    }

    public WalletDto ToDto(Wallet wallet)
    {
        return new WalletDto()
        {
            Id = wallet.Id,
            Name = wallet.Name,
            CreditCardDtos = wallet.CreditCards != null ? new List<CreditCardDto>(wallet.CreditCards.Select(i => _creditCardMapper.ToDto(i))) : new List<CreditCardDto>(),
            ApplicationUserId = wallet.ApplicationUserId,
            Cash = wallet.Cash,
            TransactionIds = new List<int>(wallet.TransactionIds ?? new List<int>()),
            CreatedAt = wallet.CreatedAt,
            UpdatedAt = wallet.UpdatedAt
        };
    }
    
    public  Wallet ToEntity(WalletDto walletDto)
    {
        return new Wallet()
        {
            Id = walletDto.Id,
            Name = walletDto.Name,
            ApplicationUserId = walletDto.ApplicationUserId,
            Cash = walletDto.Cash,
            TransactionIds = walletDto.TransactionIds,
            CreditCards = walletDto.CreditCardDtos != null ? walletDto.CreditCardDtos.Select(i => _creditCardMapper.ToEntity(i)) : new List<CreditCard>(),
            CreatedAt = walletDto.CreatedAt,
            UpdatedAt = walletDto.UpdatedAt
        };
    }
}