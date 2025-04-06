using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities;

public sealed class TokenInfo
{
    public int Id { get; set; }
    
    [Required]
    public string UserId { get; set; }
    
    [Required] 
    [MaxLength(200)] 
    public string RefreshToken { get; set; } = string.Empty;
    
    [Required]
    public DateTime ExpiredAt { get; set; }
}