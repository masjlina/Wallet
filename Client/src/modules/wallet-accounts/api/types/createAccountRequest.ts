import type {ICreditCard} from "@/domain/account.ts";

export type ICreateAccountRequest = Pick<ICreditCard, "walletId" | "name" | "balance">;
