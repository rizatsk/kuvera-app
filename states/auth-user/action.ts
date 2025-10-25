import { deleteItem, setItem } from "@/helper/secure-store";
import {
    GoogleSignin,
    isSuccessResponse
} from '@react-native-google-signin/google-signin';
import { ActionReducer } from "../action";
import { setLoading } from "../visible-loading/action";
import { AsyncSetAuthType, AuthUserType, TypeAuth } from "./type";

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
            dispatch(setLoading(true))
            const user = {
                name: 'Rizat',
                email: dataUser.name,
                photo_profile_url: 'https:123.com',
                type: 'Local' as TypeAuth
            }
            await setItem("user-auth", JSON.stringify(user))
            dispatch(setAuthUserActionCreator(user));
        } catch (error) {
            console.log("Error set auth", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export function asyncUnsetAuth() {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true))

            await deleteItem("user-auth")
            GoogleSignin.configure();
            await GoogleSignin.signOut().catch((error) => console.log('Fail google signin to logout', error));
            dispatch(unsetAuthUserActionCreator())
        } catch (error) {
            console.log("Error unset auth", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export function asyncSignInWithGoogle() {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true))

            GoogleSignin.configure();
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                console.log('Sign in with google', response)
                const tokenGoogle = await GoogleSignin.getTokens();
                console.log('Token signin google', tokenGoogle);

                const user = {
                    name: response.data.user.name || '',
                    email: response.data.user.name || '',
                    photo_profile_url: response.data.user.photo || '',
                    type: 'Google' as TypeAuth
                };
                await setItem("user-auth", JSON.stringify(user))
                dispatch(setAuthUserActionCreator(user))
            } else {
                console.log("Google sign in cancel by user")
            }
        } catch (error) {
            console.log("Error sign in with google", error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}
