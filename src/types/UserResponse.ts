import { Contact } from "./Contact";
import { Template } from "./Template";

export class UserResponse {
    readonly username: string;
    readonly templates: Template[];
    readonly contacts: Contact[];
    readonly jwt: string;
    constructor(username: string = "", templates: Template[] = [], contacts: Contact[] = [], jwt: string = "") {
        this.username = username;
        this.templates = templates;
        this.contacts = contacts;
        this.jwt = jwt;
    }
}