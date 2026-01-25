using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.DTOs;

public class ErrorResponse
{
    public IEnumerable<string> Errors { get; set; }
}