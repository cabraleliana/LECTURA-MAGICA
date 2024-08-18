let carrito = [
    {
        titulo: 'Cuentos Completos V: "La pequeña caja negra", de Philip K. Dick',
        precio: 25990,
        cantidad: 1,
        imagen: '/img/libroSelva.webp',
        id: 1
    },
    {
        titulo: 'Pack Trilogía Caballo De Troya 1, 2 Y 3, De Jj Benítez',
        precio: 43990,
        cantidad: 4,
        imagen: '/img/libroSelva.webp',
        id: 2

    }
];


function verCarrito(){
        $('#carrito').attr('class', 'carrito-visible');
    
}

function ocultarCarrito(){
    $('#carrito').attr('class', 'carrito-hidden');

}



function agregarAlCarrito() {
    let precio = document.getElementById('precio').innerText ///inner text lee el texto
    let imagen = document.getElementById('imagen').getAttribute('src') //asi leemos la imagen
    let titulo = document.getElementById('titulo').innerText
    let cantidad = parseInt(document.getElementById('quantity').value) //este es value porque es un input
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.titulo === titulo);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        productoExistente.cantidad = parseInt(productoExistente.cantidad) + cantidad;
    } else {
        // Si el producto no está en el carrito, añádelo
        carrito.push({
            titulo: titulo,
            precio: precio,
            cantidad: cantidad,
            imagen: imagen
        });
    }
    generarCarrito();
}

function actualizarTotal() {
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-AR')},00`;
}

function generarCarrito() {
    const cartItems = document.getElementById('contenido-carrito');
    cartItems.innerHTML = '';
    const content_items = document.createElement('div');
    content_items.className = 'cart';
    content_items.innerHTML = '<h2>Carrito de compras</h2>'


    carrito.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}">
            <div class="item-details">
                <p>${item.titulo}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <input type="number" value="${item.cantidad}" min="1" onchange="cambiarCantidad(${index}, 0, this.value)">
                    <button class="quantity-btn" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
                <p class="price">$${(item.precio * item.cantidad).toLocaleString('es-AR')},00</p>
                <button class="delete-btn" onclick="eliminarItem(${index})">Borrar</button>
            </div>
        `;

        content_items.appendChild(cartItem);
    });

    cartItems.appendChild(content_items)

    actualizarTotal();
}

function cambiarCantidad(index, change, newValue) {
    if (change !== 0) {
        carrito[index].cantidad += change;
    } else {
        carrito[index].cantidad = parseInt(newValue, 10);
    }
    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
    generarCarrito();
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    generarCarrito();
}

document.addEventListener('DOMContentLoaded', generarCarrito);



