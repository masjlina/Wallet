using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities;

public sealed class ApplicationUser : IdentityUser
{
    public string? AvatarUri { get; set; } = "";
    
    [Required]
    public Wallet Wallet { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
