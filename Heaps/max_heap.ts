import { Order } from '../Objects/Order';

export class MaxHeap {
    public heap: Order[]; 
    private n: number; 

    constructor(size: number) {
        this.heap = new Array(size + 1); 
        this.n = 0;
    }

    public checkMax(): Order | null {
        return this.isEmpty() ? null : this.heap[1];
    }

    public isEmpty(): boolean {
        return this.n === 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(order: Order): void {
        if (this.n === this.heap.length - 1) {
            this.resize(2 * this.heap.length); 
        }
        this.n++;
        this.heap[this.n] = order;
        this.swim(this.n); 
    }

    private swim(i: number): void {
        let parent: number = Math.floor(i / 2);
        while (i > 1 && this.heap[parent].getPrice() < this.heap[i].getPrice()) {
            this.swap(i, parent); 
            i = parent;
            parent = Math.floor(i / 2);
        }
    }

    private swap(i: number, j: number): void {
        const temp: Order = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    private resize(newSize: number): void {
        const newHeap: Order[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public getMax(): Order | null {
        if (this.isEmpty()) return null;
        const max: Order = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = null as any;
        this.n--;
        this.sink(1); 
        return max;
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i;
            if (j < this.n && this.heap[j].getPrice() < this.heap[j + 1].getPrice()) {
                j++; 
            }
            if (this.heap[i].getPrice() >= this.heap[j].getPrice()) {
                break; 
            }
            this.swap(i, j);
            i = j;
        }
    }

    public print(): void {
        for (let i = 1; i <= this.n; i++) {
            console.log(`Precio: ${this.heap[i].getPrice()}, Cantidad: ${this.heap[i].getQuantity()}`);
        }
    }

}