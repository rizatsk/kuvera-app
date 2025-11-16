import { CategorySpendType, getCategorySpend } from "@/service/category-spend/graphQl";
import { ActionReducer } from "../action";
import { AsyncGetCategorySpendParams } from "./type";

function setCategorySpendCreator(categories_spend: CategorySpendType[]) {
    return {
        type: ActionReducer.SET_CATEGORIES_SPEND,
        payload: {
            categories_spend,
        }
    }
};

export function asyncGetCategorySpend({setIsLoading}: AsyncGetCategorySpendParams) {
    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        try {
            const categories_spend = await getCategorySpend();
            dispatch(setCategorySpendCreator(categories_spend))
        } catch(error) {    
            console.log('Error asyncGetCategorySpend', error)
        } finally {
            dispatch(setIsLoading(false));
        }
    }
}