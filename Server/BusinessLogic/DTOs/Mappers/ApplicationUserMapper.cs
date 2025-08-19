using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

public class ApplicationUserMapper : IMapper<ApplicationUser, ApplicationUserDTO>
{
    private readonly IMapper<Wallet, WalletDTO> _walletMapper;

    public ApplicationUserMapper(IMapper<Wallet, WalletDTO> helper)
    {
        _walletMapper = helper;
    }

    public ApplicationUserDTO ToDTO(ApplicationUser user)
    {
        return new ApplicationUserDTO()
        {
            Id = user.Id,
            FirstName = user.FirstName ?? string.Empty,
            LastName = user.LastName ?? string.Empty,
            Email = user.Email ?? string.Empty,
            PhoneNumber = user.PhoneNumber ?? string.Empty,
            AvatarUri = user.AvatarUri,
            WalletId = user.WalletId,
            WalletDto = _walletMapper.ToDTO(user.Wallet ?? new Wallet()),
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        };
    }

    public ApplicationUser ToEntity(ApplicationUserDTO userDTO)
    {
        return new ApplicationUser()
        {
            Id = userDTO.Id,
            FirstName = userDTO.FirstName,
            LastName = userDTO.LastName,
            Email = userDTO.Email,
            PhoneNumber = userDTO.PhoneNumber,
            WalletId = userDTO.WalletId ?? 0,
            AvatarUri = userDTO.AvatarUri,
            CreatedAt = userDTO.CreatedAt,
            UpdatedAt = userDTO.UpdatedAt
        };
    }
}
