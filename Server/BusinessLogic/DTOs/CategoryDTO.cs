using System.ComponentModel.DataAnnotations;
using System.Transactions;
using DataAccess.Entities;

namespace BusinessLogic.DTOs;

public sealed class CategoryDTO : BaseEntity
{
    [Required(ErrorMessage = "Enter a category name")]
    [MaxLength(100, ErrorMessage = "Category name is too long")]
    public string Name { get; set; }
    public string? PictureUri { get; set; }
}