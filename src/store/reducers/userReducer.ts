import { User, UserActions, UserAction, UserState } from "../../types/User"

const initialState : UserState = {user: new User("", ""), logged: false};

export const userReducer = (state: UserState = initialState, action: UserAction) : UserState => {
    switch(action.type) {
        case UserActions.LOG_IN:
            return action.payload;
        case UserActions.LOG_OUT:
            return initialState;
        case UserActions.UPDATE:
            return action.payload;
        default:
            return state;
    }
}