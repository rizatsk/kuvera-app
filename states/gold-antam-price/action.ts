import { ApiGoldAntamPrice } from "@/service/gold-antam-price/api";
import { GetAntamGoldPriceProps } from "./type";

export function AsyncGetAntamGoldPrice({
    setListGoldAntam
}: GetAntamGoldPriceProps) {
    return async(dispatch: any) => {
        try {
            const result = await ApiGoldAntamPrice();
            setListGoldAntam(result as any)
        } catch(error) {
            console.log("Error get ApiGoldAntamPrice", error)
        }
    }
}