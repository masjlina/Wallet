using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities;

public sealed class CreditCard : BaseEntity
{
    // Foreign key
    [Required]
    public int WalletId { get; set; }
    [ForeignKey("WalletId")]
    public Wallet Wallet { get; set; }
    
    [Required]
    public string Name { get; set; }
    public decimal Balance { get; set; }
    
    public IEnumerable<int>? TransactionIds { get; set; }
}