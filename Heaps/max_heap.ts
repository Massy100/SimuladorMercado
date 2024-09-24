class MaxHeap {
    public heap: number[];
    private n: number; // n = cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMax(): number {
        return this.heap[1];
    }

    public isEmpty(): boolean {
        return this.n == 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(value: number): void {
        if (this.n == (this.heap.length - 1))
            this.resize(2 * this.heap.length)
        this.n++;
        this.heap[this.n] = value;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father] < this.heap[i]) {
            let temp: number = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        let newHeap: number[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++)
            newHeap[i] = this.heap[i];
        this.heap = newHeap;
    }

    public getMax(): number {
        let max: number = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = 0;
        this.n--;
        this.sink(1); // Procedimiento que reestructura el árbol AVL*/
        return max;
    }

    private sink(i: number): void {
        while (2*i <= this.n) {
            let j: number = 2*i; // empezamos asumiendo que el hijo izquierdo es el mayor
            if (j < this.n && this.heap[j] < this.heap[j+1])
                j++; // cambia a hijo derecho si este es el mayor
            if (this.heap[i] >= this.heap[j])
                break;
            // Hacemos intercambio burbuja entre los nodos para que el mayor quede en la raíz
            let temp: number = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            // verificamos si procede otro intercambio hacia abajo
            i = j;
        }
    }
}

// main
let myHeap: MaxHeap = new MaxHeap(7);
myHeap.insert(4);
myHeap.insert(5);
myHeap.insert(2);
myHeap.insert(6);
myHeap.insert(1);
myHeap.insert(3);
myHeap.insert(9);
console.log("El número más grande es " + myHeap.getMax());
console.log("El número más grande es " + myHeap.getMax());
console.log("El número más grande es " + myHeap.getMax());
