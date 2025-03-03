using BusinessLogic.DTOs;
using BusinessLogic.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/categories")]
[ApiController]
public class CategoryController : GenericController<CategoryDTO>
{
    public CategoryController(IGenericService<CategoryDTO> categoryService) : base(categoryService)
    {
    }
}