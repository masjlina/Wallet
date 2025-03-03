using BusinessLogic.DTOs;

namespace BlazorWasm.Adapters.IAdapters;

public interface IApplicationUserAdapter
{
    public Task<ApplicationUserDTO?> GetById(string applicationUserId);
    public Task<bool> Update(ApplicationUserDTO applicationUserDTO);
}