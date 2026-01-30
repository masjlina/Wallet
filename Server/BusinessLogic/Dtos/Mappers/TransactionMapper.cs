using DataAccess.Entities;

namespace BusinessLogic.Dtos.Mappers;

public  class TransactionMapper : IMapper<Transaction, TransactionDto>
{
    private readonly IMapper<Category, CategoryDto> _categoryMapper;

    public TransactionMapper(IMapper<Category, CategoryDto> categoryMapper)
    {
        _categoryMapper = categoryMapper;
    }
    public  TransactionDto ToDto( Transaction transaction)
    {
        return new TransactionDto()
        {
            Id = transaction.Id,
            Name = transaction.Name,
            Amount = transaction.Amount,
            WalletId = transaction.WalletId ?? null,
            CreditCardId = transaction.CreditCardId ?? null,
            CategoryId = transaction.CategoryId ?? null,
            CategoryDto = _categoryMapper.ToDto(transaction.Category ?? new Category()),
            Description = transaction.Description,
            UpdatedAt = transaction.UpdatedAt,
            CreatedAt = transaction.CreatedAt
        };
    }
    
    public Transaction ToEntity( TransactionDto transactionDto)
    {
        return new Transaction()
        {
            Id = transactionDto.Id,
            Name = transactionDto.Name,
            Amount = transactionDto.Amount,
            WalletId = transactionDto.WalletId,
            CategoryId = transactionDto.CategoryId,
            Description = transactionDto.Description,
            CreditCardId = transactionDto.CreditCardId,
            CreatedAt = transactionDto.CreatedAt,
            UpdatedAt = transactionDto.UpdatedAt
        };
    }
}