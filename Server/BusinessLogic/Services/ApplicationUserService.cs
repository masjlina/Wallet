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
      private readonly IMapper<ApplicationUser, ApplicationUserDTO> _mapper;

      public ApplicationUserService(ApplicationDbContext dbContext, IMapper<ApplicationUser, ApplicationUserDTO> mapper)
      {
            _dbContext = dbContext;
            _mapper = mapper;
      }
      
      public async Task<ApplicationUserDTO?> GetByIdAsync(string userId)
      {
            var user = await _dbContext.Users.Include(e => e.Wallet).FirstOrDefaultAsync(i => i.Id == userId);
            if (user is null)
            {
                  return null;
            }
            
            return _mapper.ToDTO(user);
      }
      
      public async Task<bool> UpdateAsync(ApplicationUserDTO userDTO)
      {
            var existingUser = await _dbContext.Users.FindAsync(userDTO.Id);
            if (existingUser is null)
            {
                  return false;
            }
            _dbContext.Entry(existingUser).CurrentValues.SetValues(_mapper.ToEntity(userDTO));
            await _dbContext.SaveChangesAsync();

            return false;
      }
}