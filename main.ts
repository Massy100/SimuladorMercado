import { MinHeap } from './Heaps/min_heap';
import { MaxHeap } from './Heaps/max_heap';
import { Order } from './Objects/Order';

let minHeap = new MinHeap(100);
let maxHeap = new MaxHeap(100);

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
        const buyOrder = new Order(order.type, order.quantity, order.price, order.user, order.company);
        maxHeap.insert(buyOrder);
    } else {
        const sellOrder = new Order(order.type, order.quantity, order.price, order.user, order.company);
        minHeap.insert(sellOrder);
    }
});

function pairOrders(nuevaOrden: Order, maxHeap: MaxHeap, minHeap: MinHeap) {
    if (nuevaOrden.getType() === 'buy') {
        // Verifica si hay órdenes de venta que puedan cumplir la compra
        while (!minHeap.isEmpty() && minHeap.checkMin() !== null && minHeap.checkMin()!.getPrice() <= nuevaOrden.getPrice() && nuevaOrden.getQuantity() > 0) {
            let ordenVenta = minHeap.getMin(); // Obtiene la orden de venta más barata

            if (ordenVenta !== null) {  // Asegura que ordenVenta no sea null
                if (ordenVenta.getQuantity() > nuevaOrden.getQuantity()) {
                    console.log(`Transacción parcial: ${nuevaOrden.getQuantity()} acciones a precio ${ordenVenta.getPrice()}`);
                    ordenVenta.setQuantity(ordenVenta.getQuantity() - nuevaOrden.getQuantity());
                    nuevaOrden.setQuantity(0);
                    minHeap.insert(ordenVenta); // Reinserta la orden de venta restante
                } else {
                    console.log(`Transacción completa: ${ordenVenta.getQuantity()} acciones a precio ${ordenVenta.getPrice()}`);
                    nuevaOrden.setQuantity(nuevaOrden.getQuantity() - ordenVenta.getQuantity());
                }
            }
        }

        // Si queda alguna cantidad de la orden de compra, se reinserta en el montículo
        if (nuevaOrden.getQuantity() > 0) {
            maxHeap.insert(nuevaOrden);
        }

    } else if (nuevaOrden.getType() === 'sell') {
        // Verifica si hay órdenes de compra que puedan cumplir la venta
        while (!maxHeap.isEmpty() && maxHeap.checkMax() !== null && maxHeap.checkMax()!.getPrice() >= nuevaOrden.getPrice() && nuevaOrden.getQuantity() > 0) {
            let ordenCompra = maxHeap.getMax(); // Obtiene la orden de compra con el mayor precio

            if (ordenCompra !== null) {  // Asegura que ordenCompra no sea null
                if (ordenCompra.getQuantity() > nuevaOrden.getQuantity()) {
                    console.log(`Transacción parcial: ${nuevaOrden.getQuantity()} acciones a precio ${ordenCompra.getPrice()}`);
                    ordenCompra.setQuantity(ordenCompra.getQuantity() - nuevaOrden.getQuantity());
                    nuevaOrden.setQuantity(0);
                    maxHeap.insert(ordenCompra); // Reinserta la orden de compra restante
                } else {
                    console.log(`Transacción completa: ${ordenCompra.getQuantity()} acciones a precio ${ordenCompra.getPrice()}`);
                    nuevaOrden.setQuantity(nuevaOrden.getQuantity() - ordenCompra.getQuantity());
                }
            }
        }

        // Si queda alguna cantidad de la orden de venta, se reinserta en el montículo
        if (nuevaOrden.getQuantity() > 0) {
            minHeap.insert(nuevaOrden);
        }
    }
}

// CARGAR COMPRA 
console.log("\n--- Órdenes de Compra (MaxHeap) ---");
maxHeap.print();
let nuevaCompra = new Order('buy', 55, 110, 'Usuario1', 'CompañíaA');
console.log(`\nNueva orden de compra: Precio ${nuevaCompra.getPrice()}, Cantidad ${nuevaCompra.getQuantity()}`);
maxHeap.insert(nuevaCompra);
console.log("\n--- Órdenes de Compra después de la nueva compra ---");
maxHeap.print();

// CARGAR VENTA
console.log("\n--- Órdenes de Venta (MinHeap) ---");
minHeap.print();
let nuevaVenta = new Order('sell', 75, 89, 'Usuario2', 'CompañíaB');
console.log(`\nNueva orden de venta: Precio ${nuevaVenta.getPrice()}, Cantidad ${nuevaVenta.getQuantity()}`);
minHeap.insert(nuevaVenta);
console.log("\n--- Órdenes de Venta después de la nueva venta ---");
minHeap.print();

// EMPAREJAR COMPRA
console.log("\n--- Órdenes de Compra (MaxHeap) ---");
maxHeap.print();
let emparejarVenta = new Order('sell', 75, 89, 'Usuario2', 'CompañíaB');
console.log(`\nOrden a emparejar de venta: Precio ${emparejarVenta.getPrice()}, Cantidad ${emparejarVenta.getQuantity()}`);
pairOrders(emparejarVenta, maxHeap, minHeap);
console.log("\n--- Órdenes de Compra después de la nueva compra ---");
maxHeap.print();

// EMPAREJAR VENTA
console.log("\n--- Órdenes de Venta (MinHeap) ---");
minHeap.print();
let emparejarCompra = new Order('buy', 55, 110, 'Usuario1', 'CompañíaA');
console.log(`\nOrden a emparejar de compra: Precio ${emparejarCompra.getPrice()}, Cantidad ${emparejarCompra.getQuantity()}`);
pairOrders(emparejarCompra, maxHeap, minHeap);
console.log("\n--- Órdenes de Venta después de la nueva venta ---");
minHeap.print();

