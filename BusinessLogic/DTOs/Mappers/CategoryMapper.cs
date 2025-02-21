using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public static class CategoryMapper
{
    public static CategoryDTO ToCategoryDTO(this Category category)
    {
        return new CategoryDTO()
        {
            Id = category.Id,
            Name = category.Name,
            PictureUri = category.PictureUri,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        };
    }
    
    public static Category ToCategory(this CategoryDTO categoryDTO)
    {
        return new Category()
        {
            Id = categoryDTO.Id,
            Name = categoryDTO.Name,
            PictureUri = categoryDTO.PictureUri,
            CreatedAt = categoryDTO.CreatedAt,
            UpdatedAt = categoryDTO.UpdatedAt
        };
    }
}