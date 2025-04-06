using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.DTOs;

public class SignInResponseDTO
{
    public bool IsSignInSuccessful { get; set; }
    public IEnumerable<string> Errors { get; set; }
    public string Token { get; set; }
    public ApplicationUserDTO ApplicationUserDTO { get; set; }
}