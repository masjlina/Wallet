using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Dtos;

public sealed class UpdateTransactionDto
{
    [MaxLength(50, ErrorMessage = "Transaction name must not exceed 50 characters")]
    public string? Name { get; set; }

    public string? Description { get; set; }

    [Precision(14, 2)]
    public decimal? Amount { get; set; }

    public int? CreditCardId { get; set; }
    public int? WalletId { get; set; }
    public int? CategoryId { get; set; }

    public DateTime? CreatedAt { get; set; }
}