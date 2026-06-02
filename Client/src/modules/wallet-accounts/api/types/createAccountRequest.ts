import type {ICreditCard} from "@/domain/creditCard.ts";

export type ICreateAccountRequest = Pick<ICreditCard, "walletId" | "name" | "balance">;
