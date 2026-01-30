using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Dtos;

public class ErrorResponse
{
    public IEnumerable<string> Errors { get; set; }
}