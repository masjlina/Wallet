using BusinessLogic.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.IControllers;

public interface IApplicationUserController
{
    Task<ActionResult<ApplicationUserDto>> GetById(string applicationUserId);
    Task<ActionResult> Update(ApplicationUserDto applicationUserDTO);
}