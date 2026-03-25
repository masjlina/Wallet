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

    public async Task<TransactionDto> CreateAsync(string userId, TransactionCreateRequestDto dto)
    {
        if ((dto.WalletId is null && dto.CreditCardId is null) ||
            (dto.WalletId is not null && dto.CreditCardId is not null))
        {
            throw new BusinessException(
                "Transaction must belong to either wallet or credit card",
                HttpStatusCode.BadRequest);
        }

        var now = DateTime.UtcNow;
        var transaction = new Transaction
        {
            Name = dto.Name,
            Description = dto.Description,
            Amount = dto.Amount,
            WalletId = dto.WalletId,
            CreditCardId = dto.CreditCardId,
            CategoryId = dto.CategoryId,
            CreatedAt = now,
            UpdatedAt = now
        };

        if (dto.WalletId is not null)
        {
            var wallet = await CheckOwnership.GetWalletByUserAndId(userId, dto.WalletId.Value, _dbContext);
            wallet.Cash += dto.Amount;
            transaction.Wallet = wallet;
        }
        else
        {
            var creditCard = await CheckOwnership.GetCreditCardByUserAndId(userId, dto.CreditCardId!.Value, _dbContext);
            creditCard.Balance += dto.Amount;
            transaction.CreditCard = creditCard;
        }

        _dbContext.Transactions.Add(transaction);
        await _dbContext.SaveChangesAsync();

        return _mapper.ToDto(transaction);
    }

    public async Task<TransactionDto> UpdateAsync(string userId, int transactionId, UpdateTransactionDto dto)
    {
        var transactionToUpdate = await _dbContext.Transactions
            .Include(t => t.Wallet)
            .Include(t => t.CreditCard)
            .ThenInclude(cc => cc!.Wallet)
            .FirstOrDefaultAsync(t =>
                t.Id == transactionId &&
                (
                    (t.Wallet != null && t.Wallet.ApplicationUserId == userId) ||
                    (t.CreditCard != null && t.CreditCard.Wallet.ApplicationUserId == userId)
                )
            );

        if (transactionToUpdate is null)
            throw new BusinessException("Transaction was not found", HttpStatusCode.NotFound);

        if (dto.WalletId is not null && dto.CreditCardId is not null)
        {
            throw new BusinessException(
                "Transaction must belong to either wallet or credit card",
                HttpStatusCode.BadRequest);
        }

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

        if (dto.CreatedAt.HasValue && dto.CreatedAt != transactionToUpdate.CreatedAt)
        {
            transactionToUpdate.CreatedAt = (DateTime)dto.CreatedAt;
        }

        var targetWallet = transactionToUpdate.Wallet;
        var targetCreditCard = transactionToUpdate.CreditCard;
        var newAmount = dto.Amount ?? transactionToUpdate.Amount;

        if (dto.WalletId is not null)
        {
            targetWallet = await CheckOwnership.GetWalletByUserAndId(userId, dto.WalletId.Value, _dbContext);
            targetCreditCard = null;
        }
        else if (dto.CreditCardId is not null)
        {
            targetCreditCard = await CheckOwnership.GetCreditCardByUserAndId(userId, dto.CreditCardId.Value, _dbContext);
            targetWallet = null;
        }

        if (targetWallet is null && targetCreditCard is null)
        {
            throw new BusinessException("Transaction target was not found", HttpStatusCode.BadRequest);
        }

        var targetChanged =
            targetWallet?.Id != transactionToUpdate.WalletId ||
            targetCreditCard?.Id != transactionToUpdate.CreditCardId;

        if (targetChanged)
        {
            RevertAmount(transactionToUpdate);
            ApplyAmount(targetWallet, targetCreditCard, newAmount);
            transactionToUpdate.WalletId = targetWallet?.Id;
            transactionToUpdate.CreditCardId = targetCreditCard?.Id;
            transactionToUpdate.Wallet = targetWallet;
            transactionToUpdate.CreditCard = targetCreditCard;
        }
        else if (newAmount != transactionToUpdate.Amount)
        {
            var difference = newAmount - transactionToUpdate.Amount;
            ApplyDelta(transactionToUpdate, difference);
        }

        transactionToUpdate.Amount = newAmount;
        transactionToUpdate.CategoryId = dto.CategoryId;
        transactionToUpdate.UpdatedAt = DateTime.UtcNow;

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

    private static void RevertAmount(Transaction transaction)
    {
        ApplyDelta(transaction, -transaction.Amount);
    }

    private static void ApplyAmount(Wallet? wallet, CreditCard? creditCard, decimal amount)
    {
        if (creditCard is not null)
        {
            creditCard.Balance += amount;
            return;
        }

        if (wallet is not null)
        {
            wallet.Cash += amount;
            return;
        }

        throw new BusinessException("Transaction target was not found", HttpStatusCode.BadRequest);
    }

    private static void ApplyDelta(Transaction transaction, decimal amountDelta)
    {
        if (transaction.CreditCard is not null)
        {
            transaction.CreditCard.Balance += amountDelta;
            return;
        }

        if (transaction.Wallet is not null)
        {
            transaction.Wallet.Cash += amountDelta;
            return;
        }

        throw new BusinessException("Transaction target was not found", HttpStatusCode.BadRequest);
    }
}
