import { addTransaction, getTransactionGroupByCategory, TransactionGroupByCategoryType } from "@/service/transaction/api";
import { ActionReducer } from "../action";
import { setLoading } from "../visible-loading/action";
import { AsyncAddTransactionParam, AsyncGetTransactionByCategoryParam } from "./type";

function setSumerizeTransactionByCategory(isLoading: boolean, data: TransactionGroupByCategoryType[]) {
    return {
        type: ActionReducer.SET_SUM_TRANSACTION_BY_CATEGORY,
        payload: {
            isLoading: isLoading,
            transactions: data
        }
    }
}

export function asyncAddTransaction({
    param, successHandler, goToPageSuccess,
}: AsyncAddTransactionParam) {
    return async (dispatch: any) => {
        dispatch(setLoading(true));
        try {
            const result = await addTransaction({
                category_id: param.category_id,
                created_dt: param.created_dt,
                money_spent: param.money_spent,
                notes: param.notes,
                type: param.type
            });
            successHandler();
            goToPageSuccess({
                id: result.id,
                category_id: param.category_id,
                category_name: param.category_name,
                created_dt: param.created_dt,
                money_spent: param.money_spent,
                notes: param.notes,
                type: param.type,
                source: 'add-spend'
            })
        } catch(error) {
            console.log("Error asyncAddTransaction", error)
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export function asyncGetTransactionByCategory({
    start_date, end_date, type
}: AsyncGetTransactionByCategoryParam) {
     return async (dispatch: any) => {
         let result: TransactionGroupByCategoryType[] = [];
        dispatch(setSumerizeTransactionByCategory(true, result))
        try {
            const response = await getTransactionGroupByCategory({
                start_date,
                end_date,
                type
            });

            result = response;
        } catch(error) {
            console.log("Error asyncGetTransactionByCategory", error)
        } finally {
            dispatch(setSumerizeTransactionByCategory(false, result))
        }
    }
}