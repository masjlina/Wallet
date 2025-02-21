using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services.Services;

public class ApplicationUserService : IApplicationUserService
{
      private readonly ApplicationDbContext _dbContext;

      public ApplicationUserService(ApplicationDbContext dbContext)
      {
            _dbContext = dbContext;
      }
      
      public async Task<ApplicationUserDTO?> GetByIdAsync(string userId)
      {
            ApplicationUser? user = await _dbContext.Users.FirstOrDefaultAsync(i =>  i.Id == userId);

            if (user == null)
            {
                  return new ApplicationUserDTO();
            }

            return user.ToApplicationUserDTO();
      }

      public async Task UpdateAsync(ApplicationUserDTO userDTO)
      {
            _dbContext.Users.Update(userDTO.ToApplicationUser());
            await _dbContext.SaveChangesAsync();
      }
}