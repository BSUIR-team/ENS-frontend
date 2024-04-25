import { Contact } from "./Contact";

export class Template {
    readonly id: number;
    readonly title: string;
    readonly content: string;
    recipientIds: Contact[];
    constructor(id: number = 0, title: string = "", content: string = "", recipientIds: Contact[] = []) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.recipientIds = recipientIds;
    }
}