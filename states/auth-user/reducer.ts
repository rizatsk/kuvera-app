import { ActionReducer } from "../action";
import { ActionAuthUserReducer, AuthUserType } from "./type";

function authUserReducer(
  authUser = null as AuthUserType | null,
  action = {} as ActionAuthUserReducer,
) {
  switch (action.type) {
    case ActionReducer.SET_AUTH:
      return action.payload.user;
    case ActionReducer.UNSET_AUTH:
      return null;
    default:
      return authUser;
  }
}

export default authUserReducer;