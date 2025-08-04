using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.DTOs;

public sealed class TransactionDTO : BaseEntity
{
    [Required(ErrorMessage = "Please enter a transaction name")]
    [MaxLength(50, ErrorMessage = "Transaction name must not exceed 50 characters")]
    public string Name { get; set; }
    public string? Description { get; set; }
    [Required(ErrorMessage = "Please enter an amount")]
    [Precision(14,2)]
    public decimal Amount { get; set; }
    
    // Foreign Keys
    // CreditCard
    public int? CreditCardId { get; set; }
    // Wallet
    public int? WalletId { get; set; }
    // Category
    public int? CategoryId { get; set; }
    public CategoryDTO? CategoryDTO { get; set; }
}