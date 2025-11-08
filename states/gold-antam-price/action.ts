import Variable from "@/constants/variable";
import { ApiGoldAntamPrice } from "@/service/gold-antam-price/api";
import { GetAntamGoldPriceProps } from "./type";

export function AsyncGetAntamGoldPrice({
    setListGoldAntam, setSkeletonLoading
}: GetAntamGoldPriceProps) {
    return async(dispatch: any) => {
        try {
            setSkeletonLoading(true);
            const result = await ApiGoldAntamPrice();
            setListGoldAntam(result.filter((gold) => Variable.LIST_GRAM_ANTAM.includes(gold.berat)))
        } catch(error) {
            console.log("Error get ApiGoldAntamPrice", error)
        } finally {
            setSkeletonLoading(false);
        }
    }
}