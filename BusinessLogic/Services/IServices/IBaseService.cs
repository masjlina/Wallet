namespace BusinessLogic.Services.IServices;

public interface IBaseService<TEntityDTO> where TEntityDTO : class 
{
    public Task<TEntityDTO?> GetByIdAsync(int id);
    public Task<IEnumerable<TEntityDTO>> GetAllAsync();
    public Task<bool> AddAsync(TEntityDTO entityDto);
    public Task<bool> UpdateAsync(TEntityDTO entityDto);
    public Task<bool> RemoveAsync(int entityId);
}