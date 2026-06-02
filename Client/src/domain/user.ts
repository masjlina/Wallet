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