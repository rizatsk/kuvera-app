import { ActionReducer, ActionReducerType } from "../action";


interface Action {
  type: ActionReducerType;
  payload: {
    isLoading: boolean;
  };
}

function isLoadingReducer(loading = false, action = {} as Action) {
  switch (action.type) {
    case ActionReducer.SET_LOADING:
      return action.payload.isLoading;
    default:
      return loading;
  }
}

export default isLoadingReducer;