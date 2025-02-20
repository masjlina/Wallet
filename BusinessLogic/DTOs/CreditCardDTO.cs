using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.DTOs;

public sealed class CreditCardDTO : BaseEntity
{
    public int Id { get; set; }
    
    [Required(ErrorMessage = "Wallet required")]
    public WalletDTO WalletDto { get; set; }
    
    [Required(ErrorMessage = "Please enter a card name")]
    [MaxLength(50, ErrorMessage = "Transaction name must not exceed 50 characters")]
    public string Name { get; set; }
    [Precision(14,2)]
    public decimal Balance { get; set; }

    public ICollection<int>? TransactionIds { get; set; } = new List<int>();
}