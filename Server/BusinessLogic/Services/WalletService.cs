using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class WalletService : GenericService<Wallet, WalletDTO>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper<Wallet, WalletDTO> _mapper;
    public WalletService(ApplicationDbContext dbContext, IMapper<Wallet, WalletDTO> mapper) : base(dbContext, mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public override async Task<WalletDTO?> GetByIdAsync(int walletId)
    {
        var wallet = await _dbContext.Set<Wallet>()
            .Include(e => e.CreditCards)
            .Include(e => e.ApplicationUser)
            .FirstOrDefaultAsync(i => i.Id == walletId);
        return wallet != null ? _mapper.ToDTO(wallet) : null;
    }

    public override async Task<IEnumerable<WalletDTO>> GetAllAsync()
    {
        var wallets = await _dbContext.Set<Wallet>()
            .Include(e => e.CreditCards)
            .Include(e => e.ApplicationUser)
            .ToListAsync();
        return wallets.Select(u => _mapper.ToDTO(u));
    }
}