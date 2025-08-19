using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.DTOs;

public sealed class ApplicationUserDTO
{
    [Required]
    public string Id { get; set; }
    
    [Required(ErrorMessage = "Please enter a first name")]
    public string FirstName { get; set; }
    
    [Required(ErrorMessage = "Please enter a last name")]
    public string LastName { get; set; }
    
    [Required(ErrorMessage = "Please enter an email")]
    [EmailAddress(ErrorMessage = "Invalid email")]
    public string Email { get; set; }
    
    [Required(ErrorMessage = "Please enter a phone number")]
    [Phone(ErrorMessage = "Invalid phone number format")]
    public string PhoneNumber { get; set; }
    
    [MaxLength(300, ErrorMessage = "The length is too long")]
    public string? AvatarUri { get; set; } = "";
    
    public int? WalletId { get; set; }
    public WalletDTO? WalletDto { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

}
