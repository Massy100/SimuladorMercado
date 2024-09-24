export class Order {
    private static idCounter: number = 0; 
    private readonly id: number;
    private quantity: number;
    private price: number;
    private user: string;
    private company: string;

    constructor(quantity: number, price: number, user: string, company: string) {
        this.id = ++Order.idCounter; 
        this.setQuantity(quantity);
        this.setPrice(price);
        this.user = user;
        this.company = company;
    }

    public getId(): number {
        return this.id;
    }

    public setQuantity(quantity: number): void {
        if (quantity < 0) {
            throw new Error("La cantidad no puede ser negativa");
        }
        this.quantity = quantity;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setPrice(price: number): void {
        if (price <= 0) {
            throw new Error("El precio debe ser mayor que cero.");
        }
        this.price = price;
    }

    public getPrice(): number {
        return this.price;
    }

    public setUser(user: string): void {
        this.user = user;
    }

    public getUser(): string {
        return this.user;
    }

    public setCompany(company: string): void {
        this.company = company;
    }

    public getCompany(): string {
        return this.company;
    }
}
