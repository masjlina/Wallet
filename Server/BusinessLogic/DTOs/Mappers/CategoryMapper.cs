using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public class CategoryMapper : IMapper<Category, CategoryDTO>
{
    public CategoryDTO ToDTO(Category entity)
    {
        return new CategoryDTO()
        {
            Id = entity.Id,
            Name = entity.Name,
            PictureUri = entity.PictureUri,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }

    public Category ToEntity(CategoryDTO categoryDTO)
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