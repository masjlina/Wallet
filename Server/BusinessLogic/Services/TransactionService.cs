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

        if (dto.WalletId is not null)
        {
            await CheckOwnership.GetWalletByUserId(
                userId,
                _dbContext);
        }
        else
        {
            await CheckOwnership.GetCreditCardByUserAndId(
                userId,
                dto.CreditCardId,
                _dbContext);
        }

        var transaction = _mapper.ToEntity(dto);

        _dbContext.Transactions.Add(transaction);
        await _dbContext.SaveChangesAsync();

        return _mapper.ToDto(transaction);
    }

    public async Task RemoveAsync(string userId, int transactionId)
    {
        Wallet wallet = await CheckOwnership.GetWalletByUserId(userId, _dbContext);

        var affectedRows = await _dbContext.Transactions
            .Where(t =>
                t.Id == transactionId &&
                (
                    (t.Wallet != null && t.Wallet.ApplicationUserId == userId) ||
                    (t.CreditCard != null && t.CreditCard.Wallet.ApplicationUserId == userId)
                )
            )
            .ExecuteDeleteAsync();

        if (affectedRows == 0)
            throw new BusinessException("Transaction was not found", HttpStatusCode.NotFound);
    }
}