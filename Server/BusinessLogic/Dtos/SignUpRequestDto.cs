using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Dtos;

public class SignUpRequestDto
{
    [Required(ErrorMessage = "User first name is required")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "User second name is required")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [RegularExpression("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$", ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Required(ErrorMessage = "Confirm password is required")]
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Password and confirm password is not matched")]
    public string ConfirmPassword { get; set; }
}