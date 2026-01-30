using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Dtos;

public sealed class WalletDto : BaseEntity
{
    // Foreign key
    [Required(ErrorMessage = "User required")]
    public string ApplicationUserId {get; set;}
    
    [Required(ErrorMessage = "Please enter a wallet name")]
    [MaxLength(50, ErrorMessage = "Wallet name must not exceed 50 characters")]
    public string Name {get; set;}

    [Precision(14, 2)] 
    public decimal Cash { get; set; } = 0;

    public ICollection<int>? TransactionIds { get; set; } = new List<int>();
    public ICollection<CreditCardDto>? CreditCardDtos { get; set; }
}