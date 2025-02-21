using BusinessLogic.DTOs;

namespace BusinessLogic.Services.IServices;

public interface IApplicationUserService
{ 
    public Task<ApplicationUserDTO?> GetByIdAsync(string id);
    public Task UpdateAsync(ApplicationUserDTO userDTO);
}