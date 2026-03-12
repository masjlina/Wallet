using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities;

public sealed class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public decimal MonthlyLimit { get; set; } = 1000;

    public decimal DailyLimit { get; set; } = 1000 / DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);

    public string? AvatarUri { get; set; } = "";

    public int? WalletId { get; set; }

    [ForeignKey("WalletId")] public Wallet? Wallet { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}