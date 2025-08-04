namespace BusinessLogic.Services.IServices;

public interface IGenericService<TDto>
    where TDto : class
{
    Task<TDto?> GetByIdAsync(int id);
    Task<IEnumerable<TDto>> GetAllAsync();
    Task<bool> AddAsync(TDto dto);
    Task<bool> UpdateAsync(TDto dto);
    Task<bool> RemoveAsync(int id);
}