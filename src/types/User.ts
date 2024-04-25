import { Contact } from "./Contact";
import { Template } from "./Template";

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
    readonly username: string;
    readonly contacts: Contact[];
    readonly templates: Template[];

    constructor(email: string, password: string, username: string = "", contacts: Contact[] = [], templates: Template[] = []) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.contacts = contacts;
        this.templates = templates;
    }
}