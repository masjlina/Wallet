using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class ApplicationUserService : IApplicationUserService
{
      private readonly ApplicationDbContext _dbContext;

      public ApplicationUserService(ApplicationDbContext dbContext)
      {
            _dbContext = dbContext;
      }
      
      public async Task<ApplicationUserDTO?> GetByIdAsync(string userId)
      {
            var user = await _dbContext.Users.FindAsync(userId);
            return user?.ToApplicationUserDTO();
      }
      
      public async Task<bool> UpdateAsync(ApplicationUserDTO userDTO)
      {
            var existingUser = await _dbContext.Users.FindAsync(userDTO.Id);
            if (existingUser is null)
            {
                  return false;
            }
            _dbContext.Entry(existingUser).CurrentValues.SetValues(userDTO.ToApplicationUser());
            await _dbContext.SaveChangesAsync();

            return false;
      }
}