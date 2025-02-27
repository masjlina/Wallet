using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CategoryService : GenericService<Category, CategoryDTO, int>, IGenericService<CategoryDTO, int>
{
    public CategoryService(ApplicationDbContext dbContext, IMapper<Category, CategoryDTO> mapper) : base(dbContext, mapper)
    {
    }
}