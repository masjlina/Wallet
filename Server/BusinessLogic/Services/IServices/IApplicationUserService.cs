using BusinessLogic.Dtos;

namespace BusinessLogic.Services.IServices;

public interface IApplicationUserService
{ 
    public Task<ApplicationUserDto?> GetByIdAsync(string id);
    public Task<bool> UpdateAsync(ApplicationUserDto userDto);
}