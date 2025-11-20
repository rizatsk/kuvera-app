import { CategorySpendType } from "@/service/category-spend/graphQl";
import { ActionReducer } from "../action";
import { ActionCategoriesSpendReducer } from "./type";

function categoriesSpendReducer(
  initial = [] as CategorySpendType[] | [],
  action = {} as ActionCategoriesSpendReducer,
) {
  switch (action.type) {
    case ActionReducer.SET_CATEGORIES_SPEND:
      return action.payload.categories_spend;
    default:
      return initial;
  }
}

export default categoriesSpendReducer;
