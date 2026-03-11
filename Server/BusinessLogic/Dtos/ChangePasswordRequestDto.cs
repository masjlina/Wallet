using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Dtos;

public class ChangePasswordRequestDto
{
    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public string OldPassword { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public string NewPassword { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; }
}