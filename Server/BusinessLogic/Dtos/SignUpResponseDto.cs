using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Dtos;

public class SignUpResponseDto
{
    public bool IsSuccessful { get; set; }
    public IEnumerable<string> Errors { get; set; }
}