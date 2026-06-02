using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Dtos;

public class SignInResponseDto
{
    public string AccessToken { get; set; }
    public ApplicationUserDto User { get; set; }
}