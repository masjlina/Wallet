using System.ComponentModel.DataAnnotations;
using System.Transactions;
using DataAccess.Entities;

namespace BusinessLogic.Dtos;

public sealed class CategoryDto : BaseEntity
{
    [Required(ErrorMessage = "Enter a category name")]
    [MaxLength(100, ErrorMessage = "Category name is too long")]
    public string Name { get; set; }
    public string? PictureUri { get; set; }
}