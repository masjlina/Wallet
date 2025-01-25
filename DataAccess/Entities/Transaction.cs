using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public sealed class Transaction : BaseEntity
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string? Description { get; set; }
    [Required]
    public float Amount { get; set; }
    
    // Foreign Keys
    public int CreditCardId { get; set; }
    public Category? Category { get; set; }
}