import type {IUser} from "@/domain/user.ts";

export interface ISignInResponse {
    accessToken: string,
    user: IUser
}