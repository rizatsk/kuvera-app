import { addTransaction } from "@/service/transaction/api";
import { setLoading } from "../visible-loading/action";
import { AsyncAddTransactionParam } from "./type";

export function asyncAddTransaction({
    param, successHandler
}: AsyncAddTransactionParam) {
    return async (dispatch: any) => {
        dispatch(setLoading(true));
        try {
            await addTransaction(param);
            successHandler();
        } catch(error) {
            console.log("Error asyncAddTransaction", error)
        } finally {
            dispatch(setLoading(false));
        }
    }
}