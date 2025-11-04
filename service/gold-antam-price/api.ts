import axios from 'axios';

export async function ApiGoldAntamPrice() {
    try {
        const {data: result} = await axios({
            method: 'GET',
            url: "https://www.idx.co.id/primary/TradingSummary/GetStockSummary?length=9999&start=0"
        });

        return result;
    } catch(error: any) {
        throw {
            status: error.status,
            response: error.response
        }
    }
}