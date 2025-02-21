namespace BusinessLogic.Services.IServices;

public interface IBaseService<TEntityDTO> where TEntityDTO : class 
{
    public Task<TEntityDTO?> GetByIdAsync(int id);
    public Task<IEnumerable<TEntityDTO>> GetAllAsync();
    public Task AddAsync(TEntityDTO entityDto);
    public Task UpdateAsync(TEntityDTO entityDto);
    public Task RemoveAsync(TEntityDTO entityDto);
}