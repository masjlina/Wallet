using DataAccess.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<CreditCard> CreditCards { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<TokenInfo> TokenInfos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Check constraint to ensure that either WalletId or CreditCardId is not null, but not both
        modelBuilder.Entity<Transaction>()
            .HasCheckConstraint(
                "CK_Transactions_WalletOrCreditCard", 
                "(\"WalletId\" IS NOT NULL AND \"CreditCardId\" IS NULL) OR (\"WalletId\" IS NULL AND \"CreditCardId\" IS NOT NULL)"
                );
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.CreditCard)
            .WithMany()
            .HasForeignKey(t => t.CreditCardId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}