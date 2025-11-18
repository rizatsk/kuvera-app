import { addTransaction, getTransactionGroupByCategory } from "@/service/transaction/api";
import { setLoading } from "../visible-loading/action";
import { AsyncAddTransactionParam, AsyncGetTransactionByCategoryParam } from "./type";

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
    start_date, end_date, type, setIsLoading, successHandler
}: AsyncGetTransactionByCategoryParam) {
     return async (dispatch: any) => {
        setIsLoading(true);
        try {
            const result = await getTransactionGroupByCategory({
                start_date,
                end_date,
                type
            });

            successHandler(result);
        } catch(error) {
            console.log("Error asyncGetTransactionByCategory", error)
        } finally {
            setIsLoading(false);
        }
    }
}