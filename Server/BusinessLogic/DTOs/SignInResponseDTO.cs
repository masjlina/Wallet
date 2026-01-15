using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.DTOs;

public class SignInResponseDTO
{
    public bool IsSuccessful { get; set; }
    public IEnumerable<string> Errors { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public ApplicationUserDTO ApplicationUserDTO { get; set; }
}