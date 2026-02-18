using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Dtos;

public sealed class UpdateApplicationUserDto
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    [Precision(14, 2)] public decimal? DailyLimit { get; set; }

    public string? PhoneNumber { get; set; }

    [MaxLength(300, ErrorMessage = "The length is too long")]
    public string? AvatarUri { get; set; }
}