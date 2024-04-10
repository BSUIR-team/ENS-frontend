import { Contact } from "./Contact";

export enum UserActions {LOG_IN = "LOG_IN", LOG_OUT = "LOG_OUT", UPDATE = "UPDATE"};

export interface UserState {
    user: User;
    logged: boolean;
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

export type UserAction = UserLogInAction | UserLogOutAction | UserUpdateAction;

export class User {
    readonly email: string;
    readonly password: string;
    readonly message: string;
    readonly phone: string;
    readonly contacts: Contact[];

    constructor(email: string, password: string, message: string = "", phone: string = "", contacts: Contact[] = []) {
        this.email = email;
        this.password = password;
        this.message = message;
        this.phone = phone;
        this.contacts = contacts;
    }
}