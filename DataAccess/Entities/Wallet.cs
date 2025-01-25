using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public sealed class Wallet : BaseEntity
{
    [Key]
    public int Id {get; set; }
    
    // Foreign key
    [Required]
    public string ApplicationUserId {get; set;}
    
    [Required]
    public string Name {get; set;}
    public float Cash {get; set;}

    public IEnumerable<Transaction>? Transactions { get; set; }
    public IEnumerable<CreditCard>? CreditCards { get; set; }
}