using DataAccess.Entities;

namespace BusinessLogic.DTOs.Mappers;

internal static class ApplicationUserMapper
{
    public static ApplicationUserDTO ToApplicationUserDTO(this ApplicationUser user)
    {
        return new ApplicationUserDTO()
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            AvatarUri = user.AvatarUri,
            WalletDto = user.Wallet?.ToWalletDTO(),
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        };
    }
    
    public static ApplicationUser ToApplicationUser(this ApplicationUserDTO userDTO)
    {
        return new ApplicationUser()
        {
            Id = userDTO.Id,
            UserName = userDTO.UserName,
            Email = userDTO.Email,
            PhoneNumber = userDTO.PhoneNumber,
            AvatarUri = userDTO.AvatarUri,
            CreatedAt = userDTO.CreatedAt,
            UpdatedAt = userDTO.UpdatedAt
        };
    }
}
