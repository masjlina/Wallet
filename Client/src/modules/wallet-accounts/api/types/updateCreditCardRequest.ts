import type {ICreditCard} from "@/domain/creditCard.ts";

export type IUpdateCreditCardRequest = Partial<Pick<ICreditCard, "name" | "balance">>;
