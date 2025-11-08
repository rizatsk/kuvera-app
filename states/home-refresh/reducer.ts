import { ActionReducer } from "../action";
import { ActionHomeRefreshType } from "./type";

function homeRefreshReducer(
  refresh = false,
  action = {} as ActionHomeRefreshType,
) {
  switch (action.type) {
    case ActionReducer.SET_HOME_REFRESH:
      return action.payload.refresh;
    default:
      return refresh;
  }
}

export default homeRefreshReducer;