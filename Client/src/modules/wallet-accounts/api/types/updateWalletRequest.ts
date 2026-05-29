import type {IWallet} from "@/domain/wallet.ts";

export type IUpdateWalletRequest = Partial<Pick<IWallet, "name" | "balance">>;
