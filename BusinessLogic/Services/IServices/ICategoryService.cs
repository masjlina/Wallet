using DataAccess.Entities;

namespace BusinessLogic.Services.IServices;

public interface ICategoryService
{ 
      Task<Category?> GetByIdAsync(int categoryId);
      Task<IEnumerable<Category>> GetAllAsync(Category category);
      Task AddAsync(Category category);
      Task UpdateAsync(Category category);
      Task RemoveAsync(Category category);
}