using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public static class WalletMapper
{
    public static WalletDTO ToWalletDTO(this Wallet wallet)
    {
        return new WalletDTO()
        {
            Id = wallet.Id,
            Name = wallet.Name,
            CreatedAt = wallet.CreatedAt,
            UpdatedAt = wallet.UpdatedAt,
            CreditCardDtos = new List<CreditCardDTO>(wallet.CreditCards.ToList().Select(i => i.ToCreditCardDTO())),
            ApplicationUserDto = wallet.ApplicationUser.ToApplicationUserDTO(),
            ApplicationUserId = wallet.ApplicationUserId,
            Cash = wallet.Cash,
            TransactionIds = new List<int>(wallet.TransactionIds),
        };
    }
    
    public static Wallet ToWallet(this WalletDTO walletDTO)
    {
        return new Wallet()
        {
            Id = walletDTO.Id,
            Name = walletDTO.Name,
            CreatedAt = walletDTO.CreatedAt,
            UpdatedAt = walletDTO.UpdatedAt,
            ApplicationUserId = walletDTO.ApplicationUserId,
            Cash = walletDTO.Cash,
            TransactionIds = walletDTO.TransactionIds,
            CreditCards = walletDTO.CreditCardDtos.Select(i => i.ToCreditCard())
        };
    }
}