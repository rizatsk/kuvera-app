import { getItem } from "@/helper/secure-store";
import { ActionReducer } from "../action";
import { setAuthUserActionCreator } from "../auth-user/action";
import { setLoading } from "../visible-loading/action";

export function setPreloadAction(preload: boolean) {
    return {
        type: ActionReducer.SET_PRELOAD,
        payload: {
            preload
        }
    } 
}

export function asyncPreloadProcess() {
    return async(dispatch: any) => {
        try {
            dispatch(setLoading(true))
            dispatch(setPreloadAction(true));
            const result = await getItem("user-auth") as string;
            dispatch(setAuthUserActionCreator(JSON.parse(result)));
        } finally {
            dispatch(setPreloadAction(false))
            dispatch(setLoading(false))
        }
    }
}
