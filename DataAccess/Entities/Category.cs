using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public sealed class Category : BaseEntity
{
    [Required]
    public string Name { get; set; }
    public string? PictureUri { get; set; }
}