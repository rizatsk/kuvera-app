import { ActionReducer } from "../action";
import { ActionSumTransactionByCategoryReducer, InitialSumTransactionByCategoryType } from "./type";

export function sumTransactionByCategory(
  initial = {
    isLoading: false,
    transactions: []
  } as InitialSumTransactionByCategoryType,
  action = {} as ActionSumTransactionByCategoryReducer,
) {
  switch (action.type) {
    case ActionReducer.SET_SUM_TRANSACTION_BY_CATEGORY:
      return {
        isLoading: action.payload.isLoading,
        transactions: action.payload.transactions,
      };
    default:
      return initial;
  }
}