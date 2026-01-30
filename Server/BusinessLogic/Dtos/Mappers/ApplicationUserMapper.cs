using DataAccess.Entities;

namespace BusinessLogic.Dtos.Mappers;

public class ApplicationUserMapper : IMapper<ApplicationUser, ApplicationUserDto>
{
    private readonly IMapper<Wallet, WalletDto> _walletMapper;

    public ApplicationUserMapper(IMapper<Wallet, WalletDto> helper)
    {
        _walletMapper = helper;
    }

    public ApplicationUserDto ToDto(ApplicationUser user)
    {
        return new ApplicationUserDto()
        {
            Id = user.Id,
            FirstName = user.FirstName ?? string.Empty,
            LastName = user.LastName ?? string.Empty,
            Email = user.Email ?? string.Empty,
            PhoneNumber = user.PhoneNumber ?? string.Empty,
            AvatarUri = user.AvatarUri,
            WalletId = user.WalletId,
            WalletDto = _walletMapper.ToDto(user.Wallet ?? new Wallet()),
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        };
    }

    public ApplicationUser ToEntity(ApplicationUserDto userDto)
    {
        return new ApplicationUser()
        {
            Id = userDto.Id,
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
            Email = userDto.Email,
            PhoneNumber = userDto.PhoneNumber,
            WalletId = userDto.WalletId ?? 0,
            AvatarUri = userDto.AvatarUri,
            CreatedAt = userDto.CreatedAt,
            UpdatedAt = userDto.UpdatedAt
        };
    }
}
