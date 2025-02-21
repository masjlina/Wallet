using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public static class TransactionMapper
{
    public static TransactionDTO ToTransactionDTO(this Transaction transaction)
    {
        return new TransactionDTO()
        {
            Id = transaction.Id,
            Name = transaction.Name,
            CreatedAt = transaction.CreatedAt,
            UpdatedAt = transaction.UpdatedAt,
            WalletDTO = transaction.Wallet.ToWalletDTO(),
            Amount = transaction.Amount,
            CategoryDTO = transaction.Category.ToCategoryDTO(),
            Description = transaction.Description,
            CreditCardDto = transaction.CreditCard.ToCreditCardDTO()
        };
    }
    
    public static Transaction ToTransaction(this TransactionDTO transactionDTO)
    {
        return new Transaction()
        {
            Id = transactionDTO.Id,
            Name = transactionDTO.Name,
            CreatedAt = transactionDTO.CreatedAt,
            UpdatedAt = transactionDTO.UpdatedAt,
            Amount = transactionDTO.Amount,
            CategoryId = transactionDTO.CategoryDTO.Id,
            Description = transactionDTO.Description,
            CreditCardId = transactionDTO.CreditCardDto.Id
        };
    }
}