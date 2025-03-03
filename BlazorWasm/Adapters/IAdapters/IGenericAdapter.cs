namespace BlazorWasm.Adapters.IAdapters;

public interface IGenericAdapter<TDTO>
{
    Task<TDTO?> GetById(int id);
    Task<IEnumerable<TDTO>> GetAll();
    Task<bool> Add(TDTO dto);
    Task<bool> Update(TDTO dto);
    Task<bool> Delete(int id);
}