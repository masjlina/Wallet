using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Dtos;

public sealed class TransactionCreateRequestDto
{
    [Required(ErrorMessage = "Please enter a transaction name")]
    [MaxLength(50, ErrorMessage = "Transaction name must not exceed 50 characters")]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required(ErrorMessage = "Please enter an amount")]
    [Precision(14, 2)]
    public decimal Amount { get; set; }

    public int? CreditCardId { get; set; }
    public int? WalletId { get; set; }
    public int? CategoryId { get; set; }
}
