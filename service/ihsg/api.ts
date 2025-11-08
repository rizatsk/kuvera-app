import environment from '@/constants/environment';
import { DataStocksIDXType } from '@/states/stock-idx/type';
import axios from 'axios';

export async function ApiIHSGPrice(): Promise<DataStocksIDXType[]> {
    try {
        const { data: result } = await axios({
            method: 'GET',
            url: environment.BASE_API_URL + "/service/price-ihsg"
        });

        const dataIhsg: DataStocksIDXType[] = result.data.map((ihsg: any) => {
            const percentage = (ihsg.Change / ihsg.Previous) * 100;
            return {
                No: ihsg.No,
                StockName: ihsg.StockName,
                StockCode: ihsg.StockCode,
                Close: ihsg.Close,
                Previous: ihsg.Previous,
                Change: ihsg.Change,
                Percentage: Math.floor(percentage * 100) / 100,
                High: ihsg.High,
                Low: ihsg.Low
            }
        })
        return dataIhsg;
    } catch (error: any) {
        throw {
            status: error.status,
            response: error.response
        }
    }
}