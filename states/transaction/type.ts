import { TransactionGroupByCategoryType } from "@/service/transaction/api";
import { ActionReducerType } from "../action";

export type AsyncAddTransactionParam = {
    param: AddTransactionParams
    successHandler: () => void,
    goToPageSuccess: (values: ResultAddTransaction) => void,
}

export type TypeTransaction = 'incoming' | 'outgoing';

export type AddTransactionParams = {
    category_id: string,
    category_name: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
}

export type ResultAddTransaction = {
    id: string,
    category_name: string,
    category_id: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
    source: string
}

export type AsyncGetTransactionByCategoryParam = {
    start_date: Date,
    end_date: Date,
    type: TypeTransaction,
};

export type ActionSumTransactionByCategoryReducer = {
  type: ActionReducerType;
  payload: InitialSumTransactionByCategoryType;
}

export type InitialSumTransactionByCategoryType = {
  isLoading: boolean,
  transactions: TransactionGroupByCategoryType[]
}