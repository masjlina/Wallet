using System.Net;
using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using BusinessLogic.Exceptions;
using BusinessLogic.helpers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class TransactionService : ITransactionService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<Transaction, TransactionDto> _mapper;

    public TransactionService(ApplicationDbContext dbContext, IMapper<Transaction, TransactionDto> mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<TransactionDto> GetByIdAsync(string userId, int transactionId)
    {
        var transaction = await _dbContext.Transactions
            .AsNoTracking()
            .Where(t =>
                t.Id == transactionId &&
                (
                    (t.Wallet != null && t.Wallet.ApplicationUserId == userId) ||
                    (t.CreditCard != null && t.CreditCard.Wallet.ApplicationUserId == userId)
                )
            )
            .FirstOrDefaultAsync();

        // var transaction = await _dbContext.Transactions
        //     .AsNoTracking()
        //     .Where(t => t.Id == transactionId)
        //     .Join(
        //         _dbContext.Wallets,
        //         t => t.WalletId,
        //         w => w.Id,
        //         (t, w) => new { Transaction = t, Wallet = w }
        //     )
        //     .Where(x => x.Wallet.ApplicationUserId == userId)
        //     .Select(x => x.Transaction)
        //     .FirstOrDefaultAsync();

        if (transaction is null)
            throw new BusinessException("Transaction was not found", HttpStatusCode.NotFound);

        return _mapper.ToDto(transaction);
    }

    public async Task<IReadOnlyList<TransactionDto>> GetAllAsync(string userId)
    {
        var transactions = await _dbContext.Transactions
            .AsNoTracking()
            .Where(t =>
                (
                    (t.Wallet != null && t.Wallet.ApplicationUserId == userId) ||
                    (t.CreditCard != null && t.CreditCard.Wallet.ApplicationUserId == userId)
                )
            )
            .ToListAsync();

        // var transactions = await _dbContext.Transactions
        //     .AsNoTracking()
        //     .Join(
        //         _dbContext.Wallets,
        //         t => t.WalletId,
        //         w => w.Id,
        //         (t, w) => new { Transaction = t, Wallet = w }
        //     )
        //     .Where(x => x.Wallet.ApplicationUserId == userId)
        //     .Select(x => x.Transaction)
        //     .ToListAsync();

        return transactions
            .Select(t => _mapper.ToDto(t))
            .ToList();
    }

    public async Task<TransactionDto> CreateAsync(string userId, TransactionDto dto)
    {
        if ((dto.WalletId is null && dto.CreditCardId is null) ||
            (dto.WalletId is not null && dto.CreditCardId is not null))
        {
            throw new BusinessException(
                "Transaction must belong to either wallet or credit card",
                HttpStatusCode.BadRequest);
        }

        var transaction = _mapper.ToEntity(dto);

        _dbContext.Transactions.Add(transaction);

        if (dto.WalletId is not null)
        {
            var wallet = await CheckOwnership.GetWalletByUserId(
                userId,
                _dbContext);
            wallet.Cash += dto.Amount;
        }
        else
        {
            var creditCard = await CheckOwnership.GetCreditCardByUserAndId(
                userId,
                dto.CreditCardId,
                _dbContext);
            creditCard.Balance += dto.Amount;
        }

        await _dbContext.SaveChangesAsync();

        return _mapper.ToDto(transaction);
    }

    public async Task<TransactionDto> UpdateAsync(string userId, int transactionId, UpdateTransactionDto dto)
    {
        var transactionToUpdate = await _dbContext.Transactions
            .Include(t => t.Wallet)
            .Include(t => t.CreditCard)
            .FirstOrDefaultAsync(t =>
                t.Id == transactionId &&
                (
                    t.Wallet.ApplicationUserId == userId ||
                    t.CreditCard.Wallet.ApplicationUserId == userId
                )
            );

        if (transactionToUpdate is null)
            throw new BusinessException("Transaction was not found", HttpStatusCode.NotFound);

        if (!string.IsNullOrWhiteSpace(dto.Name) &&
            dto.Name != transactionToUpdate.Name)
        {
            transactionToUpdate.Name = dto.Name;
        }

        if (!string.IsNullOrWhiteSpace(dto.Description) &&
            dto.Description != transactionToUpdate.Description)
        {
            transactionToUpdate.Description = dto.Description;
        }

        if (dto.Amount is not null &&
            dto.Amount.Value != transactionToUpdate.Amount)
        {
            var difference = dto.Amount.Value - transactionToUpdate.Amount;

            transactionToUpdate.Amount = dto.Amount.Value;

            if (transactionToUpdate.CreditCard != null)
                transactionToUpdate.CreditCard.Balance += difference;
            else
                transactionToUpdate.Wallet.Cash += difference;
        }

        if (dto.WalletId is not null)
        {
            transactionToUpdate.WalletId = dto.WalletId;
            transactionToUpdate.CreditCardId = null;
        }
        else if (dto.CreditCardId is not null)
        {
            transactionToUpdate.CreditCardId = dto.CreditCardId;
            transactionToUpdate.WalletId = null;
        }

        if (dto.CreatedAt is not null &&
            transactionToUpdate.CreatedAt != dto.CreatedAt)
        {
            transactionToUpdate.CreatedAt = dto.CreatedAt.Value;
        }

        transactionToUpdate.CategoryId = dto.CategoryId;

        await _dbContext.SaveChangesAsync();

        return _mapper.ToDto(transactionToUpdate);
    }

    public async Task RemoveAsync(string userId, int transactionId)
    {
        var transaction = await _dbContext.Transactions
            .Where(t =>
                t.Id == transactionId &&
                (
                    (t.Wallet != null && t.Wallet.ApplicationUserId == userId) ||
                    (t.CreditCard != null && t.CreditCard.Wallet.ApplicationUserId == userId)
                )
            )
            .FirstOrDefaultAsync();

        if (transaction == null)
            throw new BusinessException("Transaction was not found", HttpStatusCode.NotFound);

        if (transaction.CreditCardId != null)
        {
            var card = await _dbContext.CreditCards
                .FirstAsync(c => c.Id == transaction.CreditCardId);

            card.Balance -= transaction.Amount;
        }
        else
        {
            var wallet = await _dbContext.Wallets
                .FirstAsync(w => w.Id == transaction.WalletId);

            wallet.Cash -= transaction.Amount;
        }

        _dbContext.Remove(transaction);
        await _dbContext.SaveChangesAsync();
    }
}