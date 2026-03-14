using System.Net;
using BusinessLogic.Exceptions;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.helpers;

public static class CheckOwnership
{
    public static async Task<Wallet> GetWalletByUserId(string userId, ApplicationDbContext dbContext)
    {
        var wallet = await dbContext.Wallets
            .FirstOrDefaultAsync(w => w.ApplicationUserId == userId);

        if (wallet is null)
            throw new BusinessException("Wallet was not found", HttpStatusCode.NotFound);

        return wallet;
    }

    public static async Task<Wallet> GetWalletByUserAndId(string userId, int walletId, ApplicationDbContext dbContext)
    {
        var wallet = await dbContext.Wallets
            .FirstOrDefaultAsync(w => w.ApplicationUserId == userId && w.Id == walletId);

        if (wallet is null)
            throw new BusinessException("Wallet was not found", HttpStatusCode.NotFound);

        return wallet;
    }

    public static async Task<CreditCard> GetCreditCardByUserAndId(string userId, int creditCardId, ApplicationDbContext dbContext)
    {
        var creditCard = await dbContext.CreditCards
            .FirstOrDefaultAsync(cc => cc.Wallet.ApplicationUserId == userId && cc.Id == creditCardId);

        if (creditCard is null)
            throw new BusinessException("Credit card was not found", HttpStatusCode.NotFound);

        return creditCard;
    }
}
