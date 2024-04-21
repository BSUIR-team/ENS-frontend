import { Contact } from "./Contact";

export enum UserActions {LOG_IN = "LOG_IN", LOG_OUT = "LOG_OUT", UPDATE = "UPDATE", WAIT = "WAIT", ERROR = "ERROR"};

export interface UserState {
    user: User;
    logged: boolean;
    loading: boolean;
    error?: string;
}

interface UserLogOutAction {
    type: UserActions.LOG_OUT;
}

interface UserLogInAction {
    type: UserActions.LOG_IN;
    payload: UserState;
}

interface UserUpdateAction {
    type: UserActions.UPDATE;
    payload: UserState;
}

interface UserWaitAction {
    type: UserActions.WAIT;
    payload: UserState;
}

interface UserError {
    type: UserActions.ERROR;
    message: string;
}

export type UserAction = UserLogInAction | UserLogOutAction | UserUpdateAction | UserWaitAction | UserError;

export class User {
    readonly email: string;
    readonly password: string;
    readonly message: string;
    readonly username: string;
    readonly contacts: Contact[];

    constructor(email: string, password: string, message: string = "", username: string = "", contacts: Contact[] = []) {
        this.email = email;
        this.password = password;
        this.message = message;
        this.username = username;
        this.contacts = contacts;
    }
}