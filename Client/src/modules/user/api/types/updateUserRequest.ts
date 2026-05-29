import type {IUser} from "@/domain/user.ts";

export type IUpdateUserRequest = Partial<Pick<IUser,
    "firstName" |
    "lastName" |
    "dailyLimit" |
    "monthlyLimit" |
    "phoneNumber" |
    "avatarUri"
>>;
