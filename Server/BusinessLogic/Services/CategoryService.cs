using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CategoryService : GenericService<Category, CategoryDto>
{
    public CategoryService(ApplicationDbContext dbContext, IMapper<Category, CategoryDto> mapper) : base(dbContext, mapper)
    {
    }
}