import { Order } from '../Objects/Order';

export class MinHeap {
    private heap: Order[];
    private n: number; // n = cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMin(): Order | null {
        return this.n > 0 ? this.heap[1] : null;
    }

    public isEmpty(): boolean {
        return this.n === 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(order: Order): void {
        if (this.n === (this.heap.length - 1))
            this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order;
        this.sinkUp(this.n);
    }

    private sinkUp(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].getPrice() > this.heap[i].getPrice()) {
            // Intercambiar los nodos si el padre es mayor que el hijo
            let temp: Order = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        let newHeap: Order[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++)
            newHeap[i] = this.heap[i];
        this.heap = newHeap;
    }

    public getMin(): Order {
        if (this.isEmpty()) throw new Error("Heap is empty"); // Lanzar error si el heap está vacío
        let min: Order = this.heap[1]; // Obtener el elemento mínimo
        this.heap[1] = this.heap[this.n]; // Reemplazar la raíz con el último elemento
        this.n--; // Reducir el tamaño del heap
        this.sinkDown(1); // Reestructurar el heap
        return min; // Retornar la orden mínima
    }    
        
    private sinkDown(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i; // se empieza asumiendo que el hijo izquierdo es el menor
            if (j < this.n && this.heap[j].getPrice() > this.heap[j + 1].getPrice())
                j++; // cambia a hijo derecho si este es el menor
            if (this.heap[i].getPrice() <= this.heap[j].getPrice())
                break;
            // intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp: Order = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            // verificar si procede otro intercambio hacia abajo
            i = j;
        }
    }

    public print(): void {
        for (let i = 1; i <= this.n; i++) {
            console.log(`Precio: ${this.heap[i].getPrice()}, Cantidad: ${this.heap[i].getQuantity()}`);
        }
    }
}
