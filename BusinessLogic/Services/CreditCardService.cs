using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CreditCardService : GenericService<CreditCard, CreditCardDTO>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<CreditCard, CreditCardDTO> _mapper;
    public CreditCardService(ApplicationDbContext dbContext, IMapper<CreditCard, CreditCardDTO> mapper) : base(dbContext, mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public override async Task<CreditCardDTO?> GetByIdAsync(int creditCardId)
    {
        var creditCard = await _dbContext.Set<CreditCard>()
            .Include(e => e.Wallet)
            .FirstOrDefaultAsync(i => i.Id == creditCardId);
        return creditCard != null ? _mapper.ToDTO(creditCard) : null;
    }

    public override async Task<IEnumerable<CreditCardDTO>> GetAllAsync()
    {
        var creditCards = await _dbContext.Set<CreditCard>()
            .Include(e => e.Wallet)
            .ToListAsync();
        return creditCards.Select(u => _mapper.ToDTO(u));
    }
}
