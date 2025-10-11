import { ActionReducerType } from "../action"

export type AuthUserType = {
    name: string
}

export type AsyncSetAuthType = {
    dataUser: {
        name: string
    }
}

export type ActionAuthUserReducer = {
  type: ActionReducerType;
  payload: {
    user: AuthUserType | null;
  };
}