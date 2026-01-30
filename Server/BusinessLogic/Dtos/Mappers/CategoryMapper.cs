using DataAccess.Entities;

namespace BusinessLogic.Dtos.Mappers;

public class CategoryMapper : IMapper<Category, CategoryDto>
{
    public CategoryDto ToDto(Category entity)
    {
        return new CategoryDto()
        {
            Id = entity.Id,
            Name = entity.Name,
            PictureUri = entity.PictureUri,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }

    public Category ToEntity(CategoryDto categoryDto)
    {
        return new Category()
        {
            Id = categoryDto.Id,
            Name = categoryDto.Name,
            PictureUri = categoryDto.PictureUri,
            CreatedAt = categoryDto.CreatedAt,
            UpdatedAt = categoryDto.UpdatedAt
        };
    }
}