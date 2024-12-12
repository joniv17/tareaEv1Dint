// Variables para los elementos del DOM
const aside = document.querySelector('.aside-visible');
const openMenuButton = document.getElementById('open-menu');
const closeMenuButton = document.getElementById('close-menu');
const carritoProductos = document.querySelector("#carrito-productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoComprado = document.querySelector("#carrito-comprado");
const total = document.querySelector("#Total");
const numerito = document.querySelector("#numerito");
const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
const botonComprar = document.querySelector(".carrito-acciones-comprar");

// Variables para el carrito
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Abrir el menú lateral (aside)
openMenuButton.addEventListener('click', () => {
    aside.style.display = 'flex';  // Muestra el aside
});

// Cerrar el menú lateral (aside)
closeMenuButton.addEventListener('click', () => {
    aside.style.display = 'none';  // Oculta el aside
});

// Renderiza los productos en el carrito
function renderizarCarrito() {
    carritoProductos.innerHTML = "";

    if (productosEnCarrito.length === 0) {
        carritoVacio.style.display = "block";
        carritoComprado.style.display = "none";
        total.textContent = "$0";
        numerito.textContent = "0";
        return;
    }

    carritoVacio.style.display = "none";
    carritoComprado.style.display = "none";

    let totalCarrito = 0;
    let cantidadProductos = 0;

    productosEnCarrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        totalCarrito += subtotal;
        cantidadProductos += producto.cantidad;

        const productoHTML = `
            <div class="carrito-producto">
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${subtotal}</p>
                </div>
                <button class="carrito-producto-eliminar" data-id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            </div>`;

        carritoProductos.innerHTML += productoHTML;
    });

    total.textContent = `$${totalCarrito}`;
    numerito.textContent = cantidadProductos;
}

// Elimina un producto del carrito
function eliminarProducto(id) {
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    renderizarCarrito();
}

// Vaciar el carrito
botonVaciar.addEventListener("click", () => {
    if (productosEnCarrito.length > 0 && confirm("¿Estás seguro de que quieres eliminar todos los productos del carrito?")) {
        productosEnCarrito = [];
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
        renderizarCarrito();
    }
});

// Comprar todos los productos
botonComprar.addEventListener("click", () => {
    if (productosEnCarrito.length > 0) {
        const totalCompra = total.textContent;
        if (confirm(`¿Estás seguro que quieres comprar todos los productos por un total de ${totalCompra}?`)) {
            productosEnCarrito = [];
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
            carritoComprado.style.display = "block";
            renderizarCarrito();
        }
    }
});

// Delegación para manejar eliminación de productos
carritoProductos.addEventListener("click", (e) => {
    if (e.target.closest(".carrito-producto-eliminar")) {
        const id = e.target.closest(".carrito-producto-eliminar").dataset.id;
        if (confirm("¿Quieres eliminar el producto?")) {
            eliminarProducto(id);
        }
    }
});

// Inicializar la renderización
renderizarCarrito();
