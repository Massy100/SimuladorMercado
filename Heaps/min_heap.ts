class MinHeap {
    private heap: number[];
    private n: number; // n = cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMin(): number {
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
        while (i > 1 && this.heap[father] > this.heap[i]) {
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

    public getMin(): number {
        let min: number = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = 0;
        this.n--;
        this.sink(1); // Procedimiento que reestructura el árbol AVL*/
        return min;
    }

    private sink(i: number): void {
        while (2*i <= this.n) {
            let j: number = 2*i; // empezamos asumiendo que el hijo izquierdo es el menor
            if (j < this.n && this.heap[j] > this.heap[j+1])
                j++; // cambia a hijo derecho si este es el mayor
            if (this.heap[i] <= this.heap[j])
                break;
            // Hacemos intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp: number = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            // verificamos si procede otro intercambio hacia abajo
            i = j;
        }
    }

    public print(): void {
        let tree: string = "";
        for (let i=1; i<=this.n; i++) {
            tree += "[" + this.heap[i] + "] ";
        }
        console.log(tree);
    }
}

// main
let myMinHeap: MinHeap = new MinHeap(7);
myMinHeap.insert(4);
myMinHeap.insert(5);
myMinHeap.insert(2);
myMinHeap.insert(6);
myMinHeap.insert(1);
myMinHeap.insert(3);
myMinHeap.insert(9);
myMinHeap.print();
console.log("El número más pequeño es " + myMinHeap.getMin());
console.log("El número más pequeño es " + myMinHeap.getMin());
console.log("El número más pequeño es " + myMinHeap.getMin());
