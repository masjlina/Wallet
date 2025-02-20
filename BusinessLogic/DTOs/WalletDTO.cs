using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.DTOs;

public sealed class WalletDTO : BaseEntity
{
    public int Id {get; set; }
    
    // Foreign key
    [Required(ErrorMessage = "User required")]
    public string ApplicationUserId {get; set;}
    [ForeignKey("ApplicationUserId")]
    public ApplicationUserDTO ApplicationUserDto { get; set; }
    
    [Required(ErrorMessage = "Please enter a wallet name")]
    [MaxLength(50, ErrorMessage = "Wallet name must not exceed 50 characters")]
    public string Name {get; set;}
    [Precision(14,2)]
    public decimal Cash {get; set;}

    public ICollection<int>? TransactionIds { get; set; } = new List<int>();
    public ICollection<CreditCardDTO>? CreditCards { get; set; }
}