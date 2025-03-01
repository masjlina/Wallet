using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Entities;

public sealed class Transaction : BaseEntity
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string? Description { get; set; }
    [Required]
    public decimal Amount { get; set; }
    
    // Foreign Keys
    // CreditCard
    public int? CreditCardId { get; set; }
    [ForeignKey("CreditCardId")]
    public CreditCard? CreditCard { get; set; }
    // Wallet
    public int? WalletId { get; set; }
    [ForeignKey("WalletId")]
    public Wallet? Wallet { get; set; }
    // Category
    public int? CategoryId { get; set; }
    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }
}