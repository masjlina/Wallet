using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class GenericService<TEntity, TDto, TKey> : IGenericService<TDto, TKey>
    where TEntity : class, IEntity<TKey>
    where TDto : class
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<TEntity, TDto> _mapper;

    public GenericService(
        ApplicationDbContext dbContext,
        IMapper<TEntity, TDto> mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<TDto?> GetByIdAsync(TKey id)
    {
        var entity = await _dbContext.Set<TEntity>().FindAsync(id);
        return entity != null ? _mapper.ToDTO(entity) : null;
    }

    public async Task<IEnumerable<TDto>> GetAllAsync()
    {
        var entities = await _dbContext.Set<TEntity>().ToListAsync();
        return entities.Select(u => _mapper.ToDTO(u));
    }

    public async Task<bool> AddAsync(TDto dto)
    {
        var entity = _mapper.ToEntity(dto);
        
        if (await _dbContext.Set<TEntity>().FindAsync(entity.Id) != null)
            return false;

        await _dbContext.Set<TEntity>().AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateAsync(TDto dto)
    {
        var entity = _mapper.ToEntity(dto);
        var existing = await _dbContext.Set<TEntity>().FindAsync(entity.Id);
        
        if (existing == null)
            return false;

        _dbContext.Entry(existing).CurrentValues.SetValues(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveAsync(TKey id)
    {
        var entity = await _dbContext.Set<TEntity>().FindAsync(id);
        if (entity == null)
            return false;

        _dbContext.Set<TEntity>().Remove(entity);
        await _dbContext.SaveChangesAsync();
        return true;
    }
}