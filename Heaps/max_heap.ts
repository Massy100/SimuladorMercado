import { Order } from '../Objects/Order';

export class MaxHeap {
    public heap: Order[]; // Ahora el heap maneja objetos Order
    private n: number; // n = cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1); // El heap comienza en la posición 1
        this.n = 0;
    }

    // Retorna el orden de compra con el precio máximo (la raíz del heap)
    public checkMax(): Order | null {
        return this.isEmpty() ? null : this.heap[1];
    }

    // Verifica si el heap está vacío
    public isEmpty(): boolean {
        return this.n === 0;
    }

    // Retorna la cantidad de órdenes en el heap
    public getQuantity(): number {
        return this.n;
    }

    // Inserta una nueva orden en el heap
    public insert(order: Order): void {
        if (this.n === this.heap.length - 1) {
            this.resize(2 * this.heap.length); // Duplicar el tamaño del heap si es necesario
        }
        this.n++;
        this.heap[this.n] = order; // Insertamos la nueva orden en la última posición
        this.swim(this.n); // Reorganizamos el heap para mantener la propiedad de max-heap
    }

    // Reorganiza el heap subiendo el elemento hacia su posición correcta
    private swim(i: number): void {
        let parent: number = Math.floor(i / 2);
        while (i > 1 && this.heap[parent].getPrice() < this.heap[i].getPrice()) {
            this.swap(i, parent); // Intercambiamos si el padre tiene un precio menor que el hijo
            i = parent;
            parent = Math.floor(i / 2);
        }
    }

    // Intercambia dos elementos en el heap
    private swap(i: number, j: number): void {
        const temp: Order = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // Redimensiona el tamaño del array heap
    private resize(newSize: number): void {
        const newHeap: Order[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    // Retorna y elimina la orden con el precio máximo del heap (la raíz)
    public getMax(): Order | null {
        if (this.isEmpty()) return null;
        const max: Order = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = null as any; // Eliminar la referencia al último elemento
        this.n--;
        this.sink(1); // Reorganizar el heap hacia abajo
        return max;
    }

    // Reorganiza el heap bajando el elemento hacia su posición correcta
    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i;
            if (j < this.n && this.heap[j].getPrice() < this.heap[j + 1].getPrice()) {
                j++; // Cambia al hijo derecho si es mayor
            }
            if (this.heap[i].getPrice() >= this.heap[j].getPrice()) {
                break; // Si el padre ya es mayor que el mayor de sus hijos, se detiene
            }
            this.swap(i, j);
            i = j;
        }
    }

    // Método para mostrar el contenido del heap
    public print(): void {
        for (let i = 1; i <= this.n; i++) {
            console.log(`Precio: ${this.heap[i].getPrice()}, Cantidad: ${this.heap[i].getQuantity()}`);
        }
    }

}