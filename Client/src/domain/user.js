import {buildPatch} from "@/shared/utils/buildPatch";

export default function mapUser(userDto) {
    return {
        id: userDto.id,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        dailyLimit: userDto.dailyLimit,
        monthlyLimit: userDto.monthlyLimit,
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
                                       monthlyLimit,
                                       phoneNumber,
                                       avatarUri
                                   }) {
    const dto = {
        firstName,
        lastName,
        dailyLimit,
        monthlyLimit,
        phoneNumber,
        avatarUri
    };

    return buildPatch(dto);
}

