import { GoldAntam } from '@/components/page/home/card/price-antam/cardGoldAntamPrice';
import environment from '@/constants/environment';
import axios from 'axios';

export async function ApiGoldAntamPrice(): Promise<GoldAntam[]> {
    try {
        const {data: result} = await axios({
            method: 'GET',
            url: environment.BASE_API_URL + '/service/price-gold-antam'
        });

        return result.data;
    } catch(error: any) {
        throw {
            status: error.status,
            response: error.response
        }
    }
}