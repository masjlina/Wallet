using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Dtos;

public class CheckAuthResponseDto
{
    public ApplicationUserDto ApplicationUserDto { get; set; }
}