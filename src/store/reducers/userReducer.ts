import { User, UserActions, UserAction, UserState } from "../../types/User"

const initialState : UserState = {user: new User("", ""), logged: false, loading: false};

export const userReducer = (state: UserState = initialState, action: UserAction) : UserState => {
    switch(action.type) {
        case UserActions.LOG_IN:
        case UserActions.UPDATE:
        case UserActions.WAIT:
            return action.payload;
        case UserActions.LOG_OUT:
            return initialState;
        case UserActions.ERROR:
            return {...state, loading: false, error: action.message}
        default:
            return state;
    }
}