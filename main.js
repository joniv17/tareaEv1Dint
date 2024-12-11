document.addEventListener("DOMContentLoaded", () => {
    let carrito = {}; // Objeto para almacenar la cantidad de productos en el carrito
    let productos = []; // Aquí almacenaremos todos los productos cargados
    let categoriaActual = "todos"; // Categoria inicial (mostrar todos los productos)
    
    // Función para cargar productos desde productos.json
    async function cargarProductos() {
        const response = await fetch('./productos.json');
        productos = await response.json();
        mostrarProductos();
    }

    // Función para mostrar los productos según la categoría seleccionada
    function mostrarProductos() {
        const contenedorProductos = document.getElementById('contenedor-productos');
        contenedorProductos.innerHTML = ''; // Limpiar productos actuales
        
        // Filtrar productos por la categoría seleccionada
        const productosFiltrados = categoriaActual === "todos" 
            ? productos 
            : productos.filter(producto => producto.categoria === categoriaActual);

        // Crear HTML para los productos
        productosFiltrados.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');
            
            divProducto.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.nombre}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            `;
            
            // Agregar el producto al contenedor
            contenedorProductos.appendChild(divProducto);
        });

        // Agregar eventos a los botones de agregar
        document.querySelectorAll('.producto-agregar').forEach(boton => {
            boton.addEventListener('click', agregarAlCarrito);
        });
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(event) {
        const idProducto = event.target.dataset.id;
        if (!carrito[idProducto]) {
            carrito[idProducto] = 1;
        } else {
            carrito[idProducto]++;
        }
        actualizarCarrito();
    }

    // Función para actualizar el contador del carrito
    function actualizarCarrito() {
        const totalCarrito = Object.values(carrito).reduce((acc, cantidad) => acc + cantidad, 0);
        document.getElementById('numerito').textContent = totalCarrito;
    }

    // Manejo de la navegación entre categorías
    document.getElementById('todos').addEventListener('click', () => {
        categoriaActual = "todos";
        mostrarProductos();
    });

    document.getElementById('moviles').addEventListener('click', () => {
        categoriaActual = "moviles";
        mostrarProductos();
    });

    document.getElementById('portatiles').addEventListener('click', () => {
        categoriaActual = "portatiles";
        mostrarProductos();
    });

    document.getElementById('televisiones').addEventListener('click', () => {
        categoriaActual = "televisores";
        mostrarProductos();
    });

    // Inicializar productos
    cargarProductos();
});
