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

export type ApiGetTransactionGroupByCategoryParam = {
    start_date: Date,
    end_date: Date,
    type: TypeTransaction
}

export type TransactionGroupByCategoryType = {
    category_id: string,
    name: string,
    total_money_spent: number
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

export async function getTransactionGroupByCategory(param: ApiGetTransactionGroupByCategoryParam): Promise<TransactionGroupByCategoryType[]> {
    const accessToken = await getAccessToken();
    try {
        const { data: result } = await axios({
            method: 'GET',
            url: environment.BASE_API_URL + `/transaction/group-by-category?start_date=${param.start_date}&end_date=${param.end_date}&type=${param.type}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
        });

        return result.data
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.error,
            code: response?.code,
        };
    }
}