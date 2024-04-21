import { Contact } from "./Contact";

export class UserResponse {
    readonly username: string;
    readonly message: string;
    readonly contacts: Contact[];
    readonly jwt: string;
    constructor(username: string = "", message: string = "", contacts: Contact[] = [], jwt: string = "") {
        this.username = username;
        this.message = message;
        this.contacts = contacts;
        this.jwt = jwt;
    }
}