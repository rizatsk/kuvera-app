
import { CategorySpendType } from "@/service/category-spend/type";
import { Dispatch, SetStateAction } from "react";
import { ActionReducerType } from "../action";

export type AsyncGetCategorySpendParams = {
    setIsLoading: Dispatch<SetStateAction<boolean>> | Dispatch<boolean>
}

export type ActionCategoriesSpendReducer = {
  type: ActionReducerType;
  payload: {
    categories_spend: CategorySpendType[] | [];
    category_spend: CategorySpendType
  };
}

export type AsyncAddCategorySpendParam = {
  name_category: string
  handleSuccess: () => void
}