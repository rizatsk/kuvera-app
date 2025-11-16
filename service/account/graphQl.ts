import environment from "@/constants/environment";
import axios from "axios";
import { getAccessToken } from "../auth/handle-token";

type GetAccountGraphQlResponse = {
    name: string,
    email: string,
    photo_profile_url: string,
    created_dt: string,
    updated_dt: string | null
}

export async function getAccountGraphQl(): Promise<GetAccountGraphQlResponse> {
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
                query: `query { account { name email photo_profile_url created_dt updated_dt } }`,
                variables: {}
            })
        });

        return result.data.account;
    } catch (error: any) {
        console.log("error ini pak eko", error.response);
        const response = error.response?.data;

        throw {
            status: error.response?.status,
            message: response?.message,
            code: response?.error_code,
        };
    }
}
