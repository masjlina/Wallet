using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public sealed class Category : BaseEntity
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string? PictureUri { get; set; }
}