import type {ICreditCard} from "./account.ts";

export interface IWallet {
    id: number,
    name: string,
    balance: number,
    transactionsIds?: number[],
    creditCards?: ICreditCard[]
}

interface IWalletDto extends Omit<IWallet, "balance" | "creditCards"> {
    cash?: number;
    balance?: number;
    creditCardDtos?: ICreditCard[];
    creditCards?: ICreditCard[];
}

export type IWalletUpdate = Partial<Pick<IWallet, "name" | "balance">>;

export function mapWallet(walletDto: IWalletDto): IWallet {
    return {
        id: walletDto.id,
        name: walletDto.name,
        balance: walletDto.cash ?? walletDto.balance ?? 0,
        transactionsIds: walletDto.transactionsIds,
        creditCards: walletDto.creditCardDtos ?? walletDto.creditCards
    };
}

export function createWalletToUpdate(wallet: IWalletUpdate): IWalletUpdate {
    return {
        name: wallet.name,
        balance: wallet.balance
    };
}
