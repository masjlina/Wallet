using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class CreditCardService : GenericService<CreditCard, CreditCardDto>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<CreditCard, CreditCardDto> _mapper;
    public CreditCardService(ApplicationDbContext dbContext, IMapper<CreditCard, CreditCardDto> mapper) : base(dbContext, mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public override async Task<CreditCardDto?> GetByIdAsync(int creditCardId)
    {
        var creditCard = await _dbContext.Set<CreditCard>()
            .Include(e => e.Wallet)
            .FirstOrDefaultAsync(i => i.Id == creditCardId);
        return creditCard != null ? _mapper.ToDto(creditCard) : null;
    }

    public override async Task<IEnumerable<CreditCardDto>> GetAllAsync()
    {
        var creditCards = await _dbContext.Set<CreditCard>()
            .Include(e => e.Wallet)
            .ToListAsync();
        return creditCards.Select(u => _mapper.ToDto(u));
    }
}
