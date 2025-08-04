using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities;

public sealed class Wallet : BaseEntity
{
   
    // Foreign key
    [Required]
    public string ApplicationUserId {get; set;}
    [ForeignKey("ApplicationUserId")]
    public ApplicationUser ApplicationUser { get; set; }
    
    [Required]
    public string Name {get; set;}
    public decimal Cash {get; set;}

    public IEnumerable<int>? TransactionIds { get; set; }
    public IEnumerable<CreditCard>? CreditCards { get; set; }
}