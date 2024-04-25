export class Contact {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly phoneNumber: string;
    
    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.email = email;
        this.phoneNumber = phone;
        this.name = name;
    }

    equals(contact: Contact): boolean {
        return contact.id === this.id && contact.name === this.name && contact.phoneNumber === this.phoneNumber && contact.email === this.email;
    }
}