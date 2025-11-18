import environment from "@/constants/environment";
import { TypeTransaction } from "@/states/transaction/type";
import axios from "axios";
import { getAccessToken } from "../auth/handle-token";

export type ApiAddTransactionParam = {
    category_id: string,
    created_dt: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
}

export async function addTransaction(param: ApiAddTransactionParam) {
    const accessToken = await getAccessToken();
    try {
        const { data: result } = await axios({
            method: 'POST',
            url: environment.BASE_API_URL + '/transaction',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            data: param
        });

        return result.data;
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.error,
            code: response?.code,
        };
    }
}