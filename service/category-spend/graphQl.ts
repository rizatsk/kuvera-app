import environment from "@/constants/environment";
import axios from "axios";
import { getAccessToken } from "../auth/handle-token";

export type CategorySpendType = {
    id: string
    name: string
};

export async function getCategorySpend(): Promise<CategorySpendType[]> {
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
                query: `query { categories_spend(status: true) { id name } }`,
                variables: {}
            })
        });

        return result.data.categories_spend;
    } catch (error: any) {
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.errors[0]?.message,
            code: response?.errors[0]?.statusCode,
        };
    }
}