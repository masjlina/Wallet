using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.DTOs;

public class CheckAuthResponse
{
    public ApplicationUserDTO ApplicationUserDTO { get; set; }
}