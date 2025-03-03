using BusinessLogic.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.IControllers;

public interface IApplicationUserController
{
    Task<ActionResult<ApplicationUserDTO>> GetById(string applicationUserId);
    Task<ActionResult> Update(ApplicationUserDTO applicationUserDTO);
}