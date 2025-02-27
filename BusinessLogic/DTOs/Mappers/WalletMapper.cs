using BusinessLogic.DTOs.Mappers;
using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public class WalletMapper : IMapper<Wallet, WalletDTO>
{
    private readonly IMapper<CreditCard, CreditCardDTO> _creditCardMapper;
    
    public WalletMapper(IMapper<CreditCard, CreditCardDTO> creditCardMapper)
    {
        _creditCardMapper = creditCardMapper;
    }

    public WalletDTO ToDTO(Wallet wallet)
    {
        return new WalletDTO()
        {
            Id = wallet.Id,
            Name = wallet.Name,
            CreditCardDtos = wallet.CreditCards != null ? new List<CreditCardDTO>(wallet.CreditCards.Select(i => _creditCardMapper.ToDTO(i))) : new List<CreditCardDTO>(),
            ApplicationUserId = wallet.ApplicationUserId,
            Cash = wallet.Cash,
            TransactionIds = new List<int>(wallet.TransactionIds ?? new List<int>()),
            CreatedAt = wallet.CreatedAt,
            UpdatedAt = wallet.UpdatedAt
        };
    }
    
    public  Wallet ToEntity(WalletDTO walletDTO)
    {
        return new Wallet()
        {
            Id = walletDTO.Id,
            Name = walletDTO.Name,
            ApplicationUserId = walletDTO.ApplicationUserId,
            Cash = walletDTO.Cash,
            TransactionIds = walletDTO.TransactionIds,
            CreditCards = walletDTO.CreditCardDtos != null ? walletDTO.CreditCardDtos.Select(i => _creditCardMapper.ToEntity(i)) : new List<CreditCard>(),
            CreatedAt = walletDTO.CreatedAt,
            UpdatedAt = walletDTO.UpdatedAt
        };
    }
}