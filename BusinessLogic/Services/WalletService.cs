using BusinessLogic.DTOs;
using BusinessLogic.DTOs.Mappers;
using BusinessLogic.Services.IServices;
using DataAccess.Data;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services;

public class WalletService : GenericService<Wallet, WalletDTO>
{
    public WalletService(ApplicationDbContext dbContext, IMapper<Wallet, WalletDTO> mapper) : base(dbContext, mapper)
    {
    }
}