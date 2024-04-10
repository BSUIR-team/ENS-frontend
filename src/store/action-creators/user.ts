import { Dispatch } from "redux"
import { User, UserAction, UserActions } from "../../types/User"

export const logIn = (user: User) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.LOG_IN, payload: {user: user, logged: true}});
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
            dispatch({type: UserActions.UPDATE, payload: {user: user, logged: true}});
        }
        catch(e) {
            dispatch({type: UserActions.LOG_OUT});
        }
    }
}

export const updateFromFile = (user: User, contacts: File) => {
    return async(dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type:UserActions.UPDATE, payload: {user: user, logged: true}})
        }
        catch(e) {
            dispatch({type: UserActions.LOG_OUT});
        }
    }
}