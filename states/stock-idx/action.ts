import { ApiIHSGPrice } from "@/service/ihsg/api";
import { AsyncGetStockIDXPriceType } from "./type";

export function asyncGetStockIDXPrice({ 
    setDataStockIDX, setSkeletonLoading, setDataStockIDXSearch
}: AsyncGetStockIDXPriceType) {
    return async (dispatch: any) => {
        try {
            setSkeletonLoading(true)
            const dataStockIDX = await ApiIHSGPrice();
            setDataStockIDXSearch(dataStockIDX)
            setDataStockIDX(dataStockIDX)
        } catch (error) {
            console.log("Error get ApiGetStockIDXPrice", error)
        } finally {
            setSkeletonLoading(false)
        }
    }
}