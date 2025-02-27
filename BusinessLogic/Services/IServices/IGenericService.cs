namespace BusinessLogic.Services.IServices;

public interface IGenericService<TDto, TKey>
    where TDto : class
{
    Task<TDto?> GetByIdAsync(TKey id);
    Task<IEnumerable<TDto>> GetAllAsync();
    Task<bool> AddAsync(TDto dto);
    Task<bool> UpdateAsync(TDto dto);
    Task<bool> RemoveAsync(TKey id);
}