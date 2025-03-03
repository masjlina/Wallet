using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities;

public sealed class ApplicationUser : IdentityUser
{
    public string? AvatarUri { get; set; } = "";
    
    public int? WalletId { get; set; }
    [ForeignKey("WalletId")]
    public Wallet? Wallet { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
