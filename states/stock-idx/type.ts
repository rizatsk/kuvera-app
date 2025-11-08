import { Dispatch, SetStateAction } from "react"

export type DataStocksIDXType = {
    "No": number
    "StockCode": string
    "StockName": string
    "Close": number
    "Previous": number
    "Change": number
    "Percentage": number
    "High": number
    "Low": number
}

export type AsyncGetStockIDXPriceType = {
    setDataStockIDX: Dispatch<SetStateAction<DataStocksIDXType[]>>
    setDataStockIDXSearch: Dispatch<SetStateAction<DataStocksIDXType[]>>
    setSkeletonLoading: Dispatch<SetStateAction<boolean>>
}
