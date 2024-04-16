import { Contact } from "./Contact";

export enum UserActions {LOG_IN = "LOG_IN", LOG_OUT = "LOG_OUT", UPDATE = "UPDATE", WAIT = "WAIT"};

export interface UserState {
    user: User;
    logged: boolean;
    loading: boolean;
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

export type UserAction = UserLogInAction | UserLogOutAction | UserUpdateAction | UserWaitAction;

export class User {
    readonly email: string;
    readonly password: string;
    readonly message: string;
    readonly name: string;
    readonly contacts: Contact[];

    constructor(email: string, password: string, message: string = "", name: string = "", contacts: Contact[] = []) {
        this.email = email;
        this.password = password;
        this.message = message;
        this.name = name;
        this.contacts = contacts;
    }
}