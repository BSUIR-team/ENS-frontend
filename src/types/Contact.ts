export class Contact {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    
    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.name = name;
    }
}