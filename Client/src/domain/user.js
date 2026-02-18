export default function mapUser(userDto) {
    return {
        id: userDto.id,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        dailyLimit: userDto.dailyLimit,
        phoneNumber: userDto.phoneNumber,
        avatarUri: userDto.avatarUri,
        walletId: userDto.walletId,
        wallet: userDto.walletDto,
        createdAt: userDto.createdAt,
        updatedAt: userDto.updatedAt
    };
}

export function createUserToUpdate({
                                       firstName,
                                       lastName,
                                       dailyLimit,
                                       phoneNumber,
                                       avatarUri
                                   }) {
    return {
        firstName,
        lastName,
        dailyLimit,
        phoneNumber,
        avatarUri
    };
}

