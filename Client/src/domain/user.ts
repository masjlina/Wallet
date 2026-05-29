import type {IWallet} from "./wallet.ts";

export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    dailyLimit: number,
    monthlyLimit: number,
    phoneNumber?: string,
    avatarUri?: string,
    walletId?: number,
    wallet: IWallet,
    createdAt: Date,
    updatedAt: Date
}

interface IUserDto extends Omit<IUser, "wallet"> {
    walletDto?: IWallet;
    wallet?: IWallet;
}

export type IUserUpdate = Partial<Pick<IUser,
    "firstName" |
    "lastName" |
    "dailyLimit" |
    "monthlyLimit" |
    "phoneNumber" |
    "avatarUri"
>>;

export function mapUser(userDto: IUserDto): IUser {
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
        wallet: userDto.walletDto ?? userDto.wallet as IWallet,
        createdAt: userDto.createdAt,
        updatedAt: userDto.updatedAt
    };
}

export function createUserToUpdate(user: IUserUpdate): IUserUpdate {
    return Object.fromEntries(
        Object.entries(user).filter(([, value]) => value !== undefined)
    ) as IUserUpdate;
}
