import { ActionReducer, ActionReducerType } from "../action";


interface Action {
  type: ActionReducerType;
  payload: {
    preload: boolean;
  };
}

function isPreloadReducer(preload = true, action = {} as Action) {
  switch (action.type) {
    case ActionReducer.SET_PRELOAD:
      return action.payload.preload;
    default:
      return preload;
  }
}

export default isPreloadReducer;
