import { addCategorySpend, getCategorySpend } from "@/service/category-spend/api";
import { CategorySpendType } from "@/service/category-spend/type";
import { ActionReducer } from "../action";
import { setLoading } from "../visible-loading/action";
import { AsyncAddCategorySpendParam, AsyncGetCategorySpendParams } from "./type";

function setCategorySpendCreator(categories_spend: CategorySpendType[]) {
    return {
        type: ActionReducer.SET_CATEGORIES_SPEND,
        payload: {
            categories_spend,
        }
    }
};

function addCategorySpendCreator(category: CategorySpendType) {
    return {
        type: ActionReducer.ADD_CATEGORIES_SPEND,
        payload: {
            category_spend: category,
        }
    }
}

export function asyncGetCategorySpend({ setIsLoading }: AsyncGetCategorySpendParams) {
    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        try {
            const categories_spend = await getCategorySpend();
            dispatch(setCategorySpendCreator(categories_spend))
        } catch (error) {
            console.log('Error asyncGetCategorySpend', error)
        } finally {
            dispatch(setIsLoading(false));
        }
    }
}

export function asyncAddCategorySpend({
    name_category, handleSuccess
}: AsyncAddCategorySpendParam) {
     return async (dispatch: any) => {
        dispatch(setLoading(true));
        try {
            const categories_spend = await addCategorySpend(name_category);
            dispatch(addCategorySpendCreator(categories_spend))
            handleSuccess()
        } catch (error) {
            console.log('Error asyncAddCategorySpend', error)
        } finally {
            dispatch(setLoading(false));
        }
    }
}