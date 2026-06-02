import type {ICreditCard} from "@/domain/creditCard.ts";

export type IUpdateAccountRequest = Partial<Pick<ICreditCard, "name" | "balance">>;
