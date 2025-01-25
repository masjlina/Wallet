using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public sealed class CreditCard : BaseEntity
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public float Balance { get; set; } = 0.00F;
    
    // Foreign key
    [Required]
    public int WalletId { get; set; }
    
    public IEnumerable<Transaction>? Transactions { get; set; }
}