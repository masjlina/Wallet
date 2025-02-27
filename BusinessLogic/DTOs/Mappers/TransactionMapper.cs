using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public  class TransactionMapper : IMapper<Transaction, TransactionDTO>
{
    private readonly IMapper<Category, CategoryDTO> _categoryMapper;

    public TransactionMapper(IMapper<Category, CategoryDTO> categoryMapper)
    {
        _categoryMapper = categoryMapper;
    }
    public  TransactionDTO ToDTO( Transaction transaction)
    {
        return new TransactionDTO()
        {
            Id = transaction.Id,
            Name = transaction.Name,
            Amount = transaction.Amount,
            WalletId = transaction.WalletId,
            CreditCardId = transaction.CreditCardId,
            CategoryDTO = _categoryMapper.ToDTO(transaction.Category ?? new Category()),
            Description = transaction.Description,
            UpdatedAt = transaction.UpdatedAt,
            CreatedAt = transaction.CreatedAt
        };
    }
    
    public Transaction ToEntity( TransactionDTO transactionDTO)
    {
        return new Transaction()
        {
            Id = transactionDTO.Id,
            Name = transactionDTO.Name,
            Amount = transactionDTO.Amount,
            WalletId = transactionDTO.WalletId,
            CategoryId = transactionDTO.CategoryDTO?.Id ?? 0,
            Description = transactionDTO.Description,
            CreditCardId = transactionDTO.CreditCardId,
            CreatedAt = transactionDTO.CreatedAt,
            UpdatedAt = transactionDTO.UpdatedAt
        };
    }
}