using System.Net;
using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using BusinessLogic.Exceptions;
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

    public async Task<ApplicationUserDto> GetByIdAsync(string userId)
    {
        var user = await _dbContext.Users.FindAsync(userId);

        if (user is null)
            throw new BusinessException("User was not found", HttpStatusCode.NotFound);

        return _mapper.ToDto(user);
    }

    public async Task<ApplicationUserDto> UpdateAsync(string id, UpdateApplicationUserDto userDto)
    {
        var userToUpdate = await _dbContext.Users.FindAsync(id);

        if (userToUpdate is null)
            throw new BusinessException("User was not found", HttpStatusCode.NotFound);

        if (!string.IsNullOrWhiteSpace(userDto.FirstName))
            userToUpdate.FirstName = userDto.FirstName;

        if (!string.IsNullOrWhiteSpace(userDto.LastName))
            userToUpdate.LastName = userDto.LastName;

        if (!string.IsNullOrWhiteSpace(userDto.PhoneNumber))
            userToUpdate.PhoneNumber = userDto.PhoneNumber;

        if (!string.IsNullOrWhiteSpace(userDto.AvatarUri))
            userToUpdate.AvatarUri = userDto.AvatarUri;

        if (userDto.DailyLimit is not null)
            userToUpdate.DailyLimit = userDto.DailyLimit.Value;

        await _dbContext.SaveChangesAsync();

        return _mapper.ToDto(userToUpdate);
    }
}