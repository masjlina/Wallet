using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.DTOs;

public class SignUpRequestDTO
{
    [Required(ErrorMessage = "User name is required")]
    public string UserName { get; set; }
    [Required(ErrorMessage = "Email is required")]
    [RegularExpression("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$", ErrorMessage = "Invalid email address")]
    public string Email { get; set; }
    [DataType(DataType.PhoneNumber)]
    public string Phone { get; set; }
    
    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Required(ErrorMessage = "Confirm password is required")]
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Password and confirm password is not matched")]
    public string ConfirmPassword { get; set; }
    
    public string? AvatarUri { get; set; }
}