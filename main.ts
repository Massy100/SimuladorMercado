import { MinHeap } from './Heaps/min_heap';
import { MaxHeap } from './Heaps/max_heap';
import { Order } from './Objects/Order';

let minHeap = new MinHeap(10);
let maxHeap = new MaxHeap(10);

let orders = [
    { quantity: 50, price: 100, type: 'buy', user: 'Usuario1', company: 'EmpresaA' },
    { quantity: 60, price: 105, type: 'buy', user: 'Usuario1', company: 'EmpresaA' },
    { quantity: 70, price: 102, type: 'buy', user: 'Usuario2', company: 'EmpresaB' },
    { quantity: 40, price: 99, type: 'buy', user: 'Usuario2', company: 'EmpresaB' },
    { quantity: 30, price: 98, type: 'buy', user: 'Usuario3', company: 'EmpresaC' },
    { quantity: 80, price: 95, type: 'sell', user: 'Usuario4', company: 'EmpresaD' },
    { quantity: 90, price: 97, type: 'sell', user: 'Usuario4', company: 'EmpresaD' },
    { quantity: 100, price: 94, type: 'sell', user: 'Usuario5', company: 'EmpresaE' },
    { quantity: 110, price: 93, type: 'sell', user: 'Usuario5', company: 'EmpresaE' },
    { quantity: 120, price: 91, type: 'sell', user: 'Usuario6', company: 'EmpresaF' }
];

orders.forEach(order => {
    if (order.type === 'buy') {
        const buyOrder = new Order(order.quantity, order.price, order.user, order.company);
        maxHeap.insert(buyOrder);
    } else {
        const sellOrder = new Order(order.quantity, order.price, order.user, order.company);
        minHeap.insert(sellOrder);
    }
});

console.log("--- Órdenes de Compra (MaxHeap) ---");
maxHeap.print();

let nuevaCompra = new Order(55, 110, 'Usuario1', 'CompañíaA');
console.log(`\nNueva orden de compra: Precio ${nuevaCompra.getPrice()}, Cantidad ${nuevaCompra.getQuantity()}`);
maxHeap.insert(nuevaCompra);
console.log("--- Órdenes de Compra después de la nueva compra ---");
maxHeap.print();

console.log("\n--- Órdenes de Venta (MinHeap) ---");
minHeap.print();

let nuevaVenta = new Order(75, 89, 'Usuario2', 'CompañíaB');
console.log(`\nNueva orden de venta: Precio ${nuevaVenta.getPrice()}, Cantidad ${nuevaVenta.getQuantity()}`);
minHeap.insert(nuevaVenta);
console.log("--- Órdenes de Venta después de la nueva venta ---");
minHeap.print();
