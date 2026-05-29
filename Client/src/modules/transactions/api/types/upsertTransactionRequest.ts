import type {ITransaction} from "@/domain/transaction.ts";

export type IUpsertTransactionRequest = Pick<ITransaction, "name" | "amount"> &
    Partial<Pick<ITransaction, "walletId" | "creditCardId" | "categoryId" | "description" | "createdAt" | "updatedAt">>;
