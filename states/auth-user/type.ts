import { ActionReducerType } from "../action"

export type AuthUserType = {
    name: string,
    email: string,
    photo_profile_url: string,
    created_dt: string,
    updated_dt: string | null,
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

export type TypeAuth = 'Google' | 'Local'