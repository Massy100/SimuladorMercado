import { MinHeap } from './Heaps/min_heap';
import { MaxHeap } from './Heaps/max_heap';
import { Order } from './Objects/Order';

let minHeap = new MinHeap(100);
let maxHeap = new MaxHeap(100);

let orders = [
    { quantity: 50, price: 100, type: 'buy', user: 'Usuario1', company: 'Amazon' },
    { quantity: 60, price: 105, type: 'buy', user: 'Usuario1', company: 'Starbucks' },
    { quantity: 70, price: 102, type: 'buy', user: 'Usuario2', company: 'Macdonals' },
    { quantity: 40, price: 99, type: 'buy', user: 'Usuario2', company: 'Amazon' },
    { quantity: 30, price: 98, type: 'buy', user: 'Usuario3', company: 'Meta' },
    { quantity: 80, price: 95, type: 'sell', user: 'Usuario4', company: 'Tik Tok' },
    { quantity: 90, price: 97, type: 'sell', user: 'Usuario4', company: 'Tik Tok' },
    { quantity: 100, price: 94, type: 'sell', user: 'Usuario5', company: 'Meta' },
    { quantity: 110, price: 93, type: 'sell', user: 'Usuario5', company: 'Starbucks' },
    { quantity: 120, price: 91, type: 'sell', user: 'Usuario6', company: 'Macdonals' },
    { quantity: 50, price: 120, type: 'buy', user: 'Usuario7', company: 'Apple' },
    { quantity: 60, price: 125, type: 'buy', user: 'Usuario7', company: 'Burger King' },
    { quantity: 70, price: 122, type: 'buy', user: 'Usuario8', company: 'Apple' },
    { quantity: 40, price: 84, type: 'buy', user: 'Usuario8', company: 'YouTube' },
    { quantity: 30, price: 83, type: 'buy', user: 'Usuario9', company: 'Burger King' },
    { quantity: 80, price: 82, type: 'sell', user: 'Usuario9', company: 'YouTube' },
    { quantity: 90, price: 81, type: 'sell', user: 'Usuario10', company: 'Apple' },
    { quantity: 100, price: 80, type: 'sell', user: 'Usuario10', company: 'YouTube' },
    { quantity: 110, price: 79, type: 'sell', user: 'Usuario11', company: 'Apple' },
    { quantity: 120, price: 78, type: 'sell', user: 'Usuario11', company: 'Burger King' }
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
        // Emparejar con órdenes de venta
        while (!minHeap.isEmpty() && minHeap.checkMin() !== null && minHeap.checkMin()!.getPrice() <= nuevaOrden.getPrice() && nuevaOrden.getQuantity() > 0) {
            let ordenVenta = minHeap.getMin(); // Obtiene la orden de venta con el menor precio

            // Verifica que la orden de venta y la nueva orden de compra sean de la misma compañía
            if (ordenVenta.getCompany() === nuevaOrden.getCompany()) {
                if (ordenVenta.getQuantity() > nuevaOrden.getQuantity()) {
                    console.log(`Transacción parcial: ${nuevaOrden.getQuantity()} acciones de ${ordenVenta.getCompany()} a precio ${ordenVenta.getPrice()} vendidas por ${ordenVenta!.getUser()}`);
                    ordenVenta.setQuantity(ordenVenta.getQuantity() - nuevaOrden.getQuantity());
                    nuevaOrden.setQuantity(0);
                    minHeap.insert(ordenVenta); // Reinserta la orden de venta restante
                } else {
                    console.log(`Transacción completa: ${ordenVenta.getQuantity()} acciones de ${ordenVenta.getCompany()} a precio ${ordenVenta.getPrice()} vendidas por ${ordenVenta!.getUser()}`);
                    nuevaOrden.setQuantity(nuevaOrden.getQuantity() - ordenVenta.getQuantity());
                }
            } else {
                console.log(`No se puede emparejar, las compañías no coinciden: ${nuevaOrden.getCompany()} y ${ordenVenta.getCompany()}`);
                break; 
            }
        }

        if (nuevaOrden.getQuantity() > 0) {
            maxHeap.insert(nuevaOrden); // Si queda cantidad no emparejada, se reinserta la orden
        }

    } else if (nuevaOrden.getType() === 'sell') {
        // Emparejar con órdenes de compra
        while (!maxHeap.isEmpty() && maxHeap.checkMax() !== null && maxHeap.checkMax()!.getPrice() >= nuevaOrden.getPrice() && nuevaOrden.getQuantity() > 0) {
            let ordenCompra = maxHeap.getMax(); // Obtiene la orden de compra con el mayor precio

            // Verifica que la orden de compra y la nueva orden de venta sean de la misma compañía
            if (ordenCompra!.getCompany() === nuevaOrden.getCompany()) {
                if (ordenCompra!.getQuantity() > nuevaOrden.getQuantity()) {
                    console.log(`Transacción parcial: ${nuevaOrden.getQuantity()} acciones de ${ordenCompra!.getCompany()} a precio ${ordenCompra!.getPrice()} compradas por ${ordenCompra!.getUser()}`);
                    ordenCompra!.setQuantity(ordenCompra!.getQuantity() - nuevaOrden.getQuantity());
                    nuevaOrden.setQuantity(0);
                    maxHeap.insert(ordenCompra!); // Reinserta la orden de compra restante
                } else {
                    console.log(`Transacción completa: ${nuevaOrden.getQuantity()} acciones de ${ordenCompra!.getCompany()} a precio ${ordenCompra!.getPrice()} compradas por ${ordenCompra!.getUser()}`);
                    nuevaOrden.setQuantity(nuevaOrden.getQuantity() - ordenCompra!.getQuantity());
                }
            } else {
                console.log(`No se puede emparejar, las compañías no coinciden: ${nuevaOrden.getCompany()} y ${ordenCompra!.getCompany()}`);
                break; 
            }
        }

        if (nuevaOrden.getQuantity() > 0) {
            minHeap.insert(nuevaOrden); // Si queda cantidad no emparejada, se reinserta la orden
        }
    }
}

// CARGAR COMPRA 
console.log("\n--- Órdenes de Compra (MaxHeap) ---");
maxHeap.print();
let nuevaCompra: Order = new Order('buy', 55, 110, 'Usuario1', 'Netflix');
console.log(`\nNueva orden de compra: Precio ${nuevaCompra.getPrice()}, Cantidad ${nuevaCompra.getQuantity()}`);
maxHeap.insert(nuevaCompra);
console.log("\n--- Órdenes de Compra después de la nueva compra ---");
maxHeap.print();

// CARGAR VENTA
console.log("\n--- Órdenes de Venta (MinHeap) ---");
minHeap.print();
let nuevaVenta: Order = new Order('sell', 75, 89, 'Usuario2', 'Netflix');
console.log(`\nNueva orden de venta: Precio ${nuevaVenta.getPrice()}, Cantidad ${nuevaVenta.getQuantity()}`);
minHeap.insert(nuevaVenta);
console.log("\n--- Órdenes de Venta después de la nueva venta ---");
minHeap.print();

// EMPAREJAR COMPRA
console.log("\n--- Órdenes de Compra (MaxHeap) ---");
maxHeap.print();
let emparejarVenta: Order = new Order('sell', 75, 89, 'Usuario2', 'Netflix');
console.log(`\nOrden a emparejar de venta: Precio ${emparejarVenta.getPrice()}, Cantidad ${emparejarVenta.getQuantity()}`);
pairOrders(emparejarVenta, maxHeap, minHeap);
console.log("\n--- Órdenes de Compra después del emparejamiento de compra ---");
maxHeap.print();

// EMPAREJAR VENTA
console.log("\n--- Órdenes de Venta (MinHeap) ---");
minHeap.print();
let emparejarCompra: Order = new Order('buy', 55, 110, 'Usuario1', 'Netflix');
console.log(`\nOrden a emparejar de compra: Precio ${emparejarCompra.getPrice()}, Cantidad ${emparejarCompra.getQuantity()}`);
pairOrders(emparejarCompra, maxHeap, minHeap);
console.log("\n--- Órdenes de Venta después del emparejamiento de venta ---");
minHeap.print();

