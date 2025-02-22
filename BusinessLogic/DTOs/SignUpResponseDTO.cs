using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.DTOs;

public class SignUpResponseDTO
{
    public bool IsRegistrationSuccessful { get; set; }
    public IEnumerable<string> Errors { get; set; }
}