using BusinessLogic.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Controllers.IControllers;

namespace WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GenericController<TDTO> : ControllerBase, IGenericController<TDTO> where TDTO : class, new()
{
    private readonly IGenericService<TDTO> _genericService;

    public GenericController(IGenericService<TDTO> genericService)
    {
        _genericService = genericService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TDTO>> Get(int id)
    {
        var entityDTO = await _genericService.GetByIdAsync(id);
        if (entityDTO is null)
        {
            return NotFound();
        }

        return Ok(entityDTO);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TDTO>>> GetAll()
    {
        var entityDTOs = await _genericService.GetAllAsync();
        
        return Ok(entityDTOs);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] TDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var result = await _genericService.AddAsync(dto);

        return result ? Ok() : BadRequest();
    }

    [HttpPatch]
    public async Task<IActionResult> Update([FromBody] TDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var result = await _genericService.UpdateAsync(dto);

        return result ? Ok() : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _genericService.RemoveAsync(id);

        return result ? Ok() : BadRequest();
    }
}