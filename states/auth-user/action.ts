import { deleteItem, setItem } from "@/helper/secure-store";
import {
    GoogleSignin,
    isSuccessResponse
} from '@react-native-google-signin/google-signin';
import { ActionReducer } from "../action";
import { AsyncSetAuthType, AuthUserType } from "./type";

export function setAuthUserActionCreator(user: AuthUserType) {
    return {
        type: ActionReducer.SET_AUTH,
        payload: {
            user: user,
        }
    }
};

export function unsetAuthUserActionCreator() {
    return {
        type: ActionReducer.UNSET_AUTH,
        payload: {
            user: null,
        },
    };
}

export function asyncSetAuthUser({
    dataUser
}: AsyncSetAuthType) {
    return async (dispatch: any) => {
        try {
            await setItem("user-auth", JSON.stringify(dataUser))
            dispatch(setAuthUserActionCreator(dataUser));
        } catch (error) {
            console.log("Error set auth", error)
        }
    }
}

export function asyncUnsetAuth() {
    return async (dispatch: any) => {
        try {
            await deleteItem("user-auth")
            dispatch(unsetAuthUserActionCreator())
        } catch (error) {
            console.log("Error unset auth", error)
        }
    }
}

export function asyncSignInWithGoogle() {
    return async (dispatch: any) => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                console.log('Sign in with google', response)
            } else {
                // sign in was cancelled by user
                console.log('Cancel by user', response)
            }
        } catch (error) {
            console.log("Error sign in with google", error)
        }
    }
}