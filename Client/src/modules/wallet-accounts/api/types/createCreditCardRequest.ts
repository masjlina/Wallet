import type {ICreditCard} from "@/domain/creditCard.ts";

export type ICreateCreditCardRequest = Pick<ICreditCard, "walletId" | "name" | "balance">;
