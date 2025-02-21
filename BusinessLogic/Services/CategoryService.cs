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
            var category = await _dbContext.Categories.FirstOrDefaultAsync(i =>  i.Id == categoryId);

            if (category == null)
            {
                  return new CategoryDTO();
            }
            
            return category.ToCategoryDTO();
      }

      public async Task<IEnumerable<CategoryDTO>> GetAllAsync()
      {
            var categories = await _dbContext.Categories.ToListAsync();

            if (categories == null)
            {
                  return new List<CategoryDTO>();
            }
            
            return categories.Select(i => i.ToCategoryDTO());
      }

      public async Task AddAsync(CategoryDTO categoryDTO)
      {
            await _dbContext.Categories.AddAsync(categoryDTO.ToCategory());
            await _dbContext.SaveChangesAsync();
      }

      public async Task UpdateAsync(CategoryDTO categoryDTO)
      {
            _dbContext.Categories.Update(categoryDTO.ToCategory());
            await _dbContext.SaveChangesAsync();
      }

      public async Task RemoveAsync(CategoryDTO categoryDTO)
      {
            _dbContext.Categories.Remove(categoryDTO.ToCategory());
            await _dbContext.SaveChangesAsync();
      }
}