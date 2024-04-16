import { Dispatch } from "redux"
import { User, UserAction, UserActions } from "../../types/User"
import axios, { AxiosResponse } from "axios"

export const logIn = (user: User) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: false, loading: true}});
            await new Promise((resolve)=>setTimeout(resolve, 3000));

            // await axios.post("", user).then((response: AxiosResponse<User, any>)=>{
            //     dispatch({type: UserActions.LOG_IN, payload: {user: response.data, logged: true, loading: false}});
            // }).catch(()=> {
            //     throw new Error();
            // })
            console.log('stop');
            dispatch({type: UserActions.LOG_IN, payload: {user: user, logged: true, loading: false}});
        }
        catch(e) {
            dispatch({type: UserActions.LOG_OUT});
        }
    }
}

export const logOut = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({type:UserActions.LOG_OUT});
    }
}

export const update = (user: User) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.UPDATE, payload: {user: user, logged: true, loading: false}});
        }
        catch(e) {
            dispatch({type: UserActions.LOG_OUT});
        }
    }
}

export const updateFromFile = (user: User/*, contacts: File*/) => {
    return async(dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type:UserActions.UPDATE, payload: {user: user, logged: true, loading: false}})
        }
        catch(e) {
            dispatch({type: UserActions.LOG_OUT});
        }
    }
}