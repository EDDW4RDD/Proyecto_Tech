
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion();
}

function actualizarCarrito() {
    const carritoConteo = document.querySelector('.cart-count');
    const totalCantidad = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    carritoConteo.textContent = totalCantidad;

    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';
    let totalCarrito = 0;
    carrito.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
        totalCarrito += producto.precio * producto.cantidad;
    });
    document.getElementById('totalCarrito').textContent = totalCarrito.toFixed(2);
}

function mostrarNotificacion() {
    const notificacion = document.getElementById('notification');
    notificacion.style.display = 'block';
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 2000);
}

function mostrarCarrito() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
}

function cerrarCarrito() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Actualiza el carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);