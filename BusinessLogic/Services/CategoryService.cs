using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _dbContext;

    public CategoryService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
      
    public async Task<CategoryDTO?> GetByIdAsync(int categoryId)
    {
        var category = await _dbContext.Categories.FindAsync(categoryId);
        return category?.ToCategoryDTO();
    }

    public async Task<IEnumerable<CategoryDTO>> GetAllAsync()
    {
        var categories = await _dbContext.Categories.ToListAsync();
        return categories.Select(i => i.ToCategoryDTO());
    }

    public async Task<bool> AddAsync(CategoryDTO categoryDTO)
    {
        var existingCategory = await _dbContext.Categories.FindAsync(categoryDTO.Id);
        if (existingCategory is not null)
        {
            return false;
        }
        
        await _dbContext.Categories.AddAsync(categoryDTO.ToCategory());
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateAsync(CategoryDTO categoryDTO)
    {
        var existingCategory = await _dbContext.Categories.FindAsync(categoryDTO.Id);
        if (existingCategory is null)
        {
            return false;
        }

        _dbContext.Entry(existingCategory).CurrentValues.SetValues(categoryDTO.ToCategory());
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveAsync(int categoryId)
    {
        var category = await _dbContext.Categories.FindAsync(categoryId);
        if (category is null)
        {
            return false;
        }

        _dbContext.Categories.Remove(category);
        await _dbContext.SaveChangesAsync();

        return true;
    }
}