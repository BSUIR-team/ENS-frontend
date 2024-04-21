import { Dispatch } from "redux"
import { User, UserAction, UserActions } from "../../types/User"
import axios, { AxiosResponse } from "axios"
import { AUTH_URI, UPDATE_URI } from "../../resources/URIs"
import { UserResponse } from "../../types/UserResponse"

const JWT_KEY: string = "jwt";
const TIMEOUT_MILLIS: number = 10000;

export const logIn = (user: User) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: false, loading: true}});

            await axios.post(AUTH_URI, user, {
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<UserResponse, any>)=>{
                localStorage.setItem(JWT_KEY, response.data.jwt);
                let userInfo = new User(user.email, user.password, response.data.message, response.data.username, response.data.contacts);
                dispatch({type: UserActions.LOG_IN, payload: {user: userInfo, logged: true, loading: false}});
            }).catch(()=> {
                throw new Error();
            })
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedLogIn"});
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
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            await axios.put(UPDATE_URI, user, {
                headers: {
                    Authorization : jwt
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<User, any>) => {
                dispatch({type: UserActions.UPDATE, payload: {user: response.data, logged: true, loading: false}});
            }).catch(()=>{
                throw new Error();
            });
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"});
        }
    }
}

export const updateFromFile = (user: User, contacts: File) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            await axios.put(UPDATE_URI, contacts, {
                headers : {
                    Authorization : jwt
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<User, any>)=>{
                dispatch({type: UserActions.UPDATE, payload: {user: response.data, logged: true, loading: false}});
            }).catch(() => {
                throw new Error();
            });
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"});        
        }
    }
}