// Variables para el carrito
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoProductos = document.querySelector("#carrito-productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoComprado = document.querySelector("#carrito-comprado");
const total = document.querySelector("#Total");
const numerito = document.querySelector("#numerito");
const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
const botonComprar = document.querySelector(".carrito-acciones-comprar");

// Función para renderizar los productos del carrito
function renderizarCarrito() {
    carritoProductos.innerHTML = "";  // Limpiar el carrito

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

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    // Verifica si el producto ya está en el carrito
    const index = productosEnCarrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
        productosEnCarrito[index].cantidad += 1; // Si ya está, incrementa la cantidad
    } else {
        productosEnCarrito.push({...producto, cantidad: 1}); // Si no está, lo agrega con cantidad 1
    }

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    renderizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    renderizarCarrito();
}

// Función para vaciar el carrito
botonVaciar.addEventListener("click", () => {
    if (productosEnCarrito.length > 0 && confirm("¿Estás seguro de que quieres eliminar todos los productos del carrito?")) {
        productosEnCarrito = [];
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
        renderizarCarrito();
    }
});

// Función para simular la compra de todos los productos
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

// Delegación de eventos para eliminar productos individuales
carritoProductos.addEventListener("click", (e) => {
    if (e.target.closest(".carrito-producto-eliminar")) {
        const id = e.target.closest(".carrito-producto-eliminar").dataset.id;
        if (confirm("¿Quieres eliminar el producto?")) {
            eliminarProducto(id);
        }
    }
});

// Inicializar la renderización del carrito al cargar la página
renderizarCarrito();

// Simular la funcionalidad de agregar productos al carrito
// Este código se activará cuando agregues un producto al carrito desde el catálogo
const botonAgregarCarrito = document.querySelectorAll(".boton-agregar-carrito"); // Suponiendo que tienes un botón con esta clase en cada producto

botonAgregarCarrito.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const producto = {
            id: e.target.dataset.id, // Asumiendo que cada producto tiene un id único
            nombre: e.target.dataset.nombre, // Suponiendo que los productos tienen nombre
            precio: parseFloat(e.target.dataset.precio), // Suponiendo que los productos tienen precio
            imagen: e.target.dataset.imagen, // Suponiendo que los productos tienen imagen
        };
        agregarAlCarrito(producto);
    });
});

// Función para volver al login
const logo = document.querySelector('.logo'); // Asegúrate de que tienes un elemento con la clase 'logo'
logo.addEventListener('click', () => {
    localStorage.removeItem("carrito"); // Elimina el carrito del almacenamiento local
    window.location.href = "login.html"; // Redirige al login (ajusta la URL según corresponda)
});
