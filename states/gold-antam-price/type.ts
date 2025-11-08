import { GoldAntam } from "@/components/page/home/card/price-antam/cardGoldAntamPrice"
import { Dispatch, SetStateAction } from "react"

export type GetAntamGoldPriceProps = {
    setListGoldAntam: Dispatch<SetStateAction<GoldAntam[]>>
    setSkeletonLoading: Dispatch<SetStateAction<boolean>>
}