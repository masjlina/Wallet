using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class ApplicationUserService : IApplicationUserService
{
      private readonly ApplicationDbContext _dbContext;
      private readonly IMapper<ApplicationUser, ApplicationUserDto> _mapper;

      public ApplicationUserService(ApplicationDbContext dbContext, IMapper<ApplicationUser, ApplicationUserDto> mapper)
      {
            _dbContext = dbContext;
            _mapper = mapper;
      }
      
      public async Task<ApplicationUserDto?> GetByIdAsync(string userId)
      {
            var user = await _dbContext.Users.Include(e => e.Wallet).FirstOrDefaultAsync(i => i.Id == userId);
            if (user is null)
            {
                  return null;
            }
            
            return _mapper.ToDto(user);
      }
      
      public async Task<bool> UpdateAsync(ApplicationUserDto userDto)
      {
            var existingUser = await _dbContext.Users.FindAsync(userDto.Id);
            if (existingUser is null)
            {
                  return false;
            }
            _dbContext.Entry(existingUser).CurrentValues.SetValues(_mapper.ToEntity(userDto));
            await _dbContext.SaveChangesAsync();

            return false;
      }
}