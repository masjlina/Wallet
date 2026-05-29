import type {IUser} from "@/domain/user.ts";

type FieldsFromUserType = Pick<IUser, "firstName" | "lastName" | "email">

export interface ISignUpRequest extends FieldsFromUserType{
        password: string,
        confirmPassword: string,
        rememberMe: "on" | "off"
}