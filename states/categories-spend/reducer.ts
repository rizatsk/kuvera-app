import { CategorySpendType } from "@/service/category-spend/type";
import { ActionReducer } from "../action";
import { ActionCategoriesSpendReducer } from "./type";

function categoriesSpendReducer(
  initial = [] as CategorySpendType[] | [],
  action = {} as ActionCategoriesSpendReducer,
) {
  switch (action.type) {
    case ActionReducer.SET_CATEGORIES_SPEND:
      return action.payload.categories_spend;
    case ActionReducer.ADD_CATEGORIES_SPEND:
      console.log("data initial categories spend", initial)
      const newCategory = [...initial, action.payload.category_spend];
      return newCategory;
    default:
      return initial;
  }
}

export default categoriesSpendReducer;
