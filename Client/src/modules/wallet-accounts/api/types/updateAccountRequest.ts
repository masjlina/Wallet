import type {ICreditCard} from "@/domain/account.ts";

export type IUpdateAccountRequest = Partial<Pick<ICreditCard, "name" | "balance">>;
