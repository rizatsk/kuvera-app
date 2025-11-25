import environment from "@/constants/environment";
import axios from "axios";
import { getAccessToken } from "../auth/handle-token";
import { ApiAddTransactionParam, ApiGetTransactionGroupByCategoryParam, GetTransactionsParam, GetTransactionType, TransactionGroupByCategoryType } from "./type";

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
            method: 'POST',
            url: environment.BASE_URL + '/graphql',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            data: JSON.stringify({
                query: `query { sumerize_category_transactions(
                    type: "outgoing" 
                    start_date: "2025-11-01 00:00:00" 
                    end_date: "2025-11-25 23:59:59"
                ) { category_id category_name total_money_spent } }`,
                variables: {}
            })
        });

        return result.data.sumerize_category_transactions;
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.error,
            code: response?.code,
        };
    }
}

export async function getTransactions(param: GetTransactionsParam): Promise<GetTransactionType[]> {
    const accessToken = await getAccessToken();
    try {
        let query = `(type: "${param.type}"`
        if (param.limit) query += `limit: ${param.limit}`
        if (param.start_date && param.end_date) query += ` start_date: "${param.start_date}" end_date: "${param.end_date}"`
        query += `)`

        const { data: result } = await axios({
            method: 'POST',
            url: environment.BASE_URL + '/graphql',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            data: JSON.stringify({
                query: `query { transactions${query} 
                    { id category_name money_spent notes type created_dt } }`,
                variables: {}
            })
        });

        return result.data.transactions;
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.errors[0]?.message,
            code: response?.errors[0]?.statusCode,
        };
    }
}