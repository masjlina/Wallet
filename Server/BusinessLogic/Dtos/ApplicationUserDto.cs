using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Dtos;

public sealed class ApplicationUserDto
{
    [Required] public string Id { get; set; }

    [Required(ErrorMessage = "Please enter a first name")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Please enter a last name")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Please enter an email")]
    [EmailAddress(ErrorMessage = "Invalid email")]
    public string Email { get; set; }

    [Precision(14, 2)] public decimal DailyLimit { get; set; } = 100;
    [Precision(14, 2)] public decimal MonthlyLimit { get; set; } = 1000;


    [Required(ErrorMessage = "Please enter a phone number")]
    [Phone(ErrorMessage = "Invalid phone number format")]
    public string PhoneNumber { get; set; }

    [MaxLength(300, ErrorMessage = "The length is too long")]
    public string? AvatarUri { get; set; } = "";

    public int? WalletId { get; set; }
    public WalletDto? WalletDto { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}