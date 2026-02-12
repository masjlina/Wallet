using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Dtos;

public sealed class UpdateWalletDto
{
    [MaxLength(50, ErrorMessage = "Transaction name must not exceed 50 characters")]
    public string? Name { get; set; }

    [Precision(14,2)]
    public decimal? Balance { get; set; }
}

