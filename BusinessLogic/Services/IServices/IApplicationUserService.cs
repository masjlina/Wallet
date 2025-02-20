using DataAccess.Entities;

namespace BusinessLogic.Services.IServices;

public interface IApplicationUserService
{ 
      Task<ApplicationUser?> GetByIdAsync(string applicationUserId);
      Task<IEnumerable<ApplicationUser>> GetAllAsync(ApplicationUser applicationUser);
      Task AddAsync(ApplicationUser applicationUser);
      Task UpdateAsync(ApplicationUser applicationUser);
      Task RemoveAsync(ApplicationUser applicationUser);
}