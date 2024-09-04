$(document).ready(function() {
    // Aquí va el código que deseas ejecutar cuando la página se cargue.
    if(!localStorage.getItem("carrito")){
        localStorage.setItem("carrito",JSON.stringify([]))
    }

    generarCarrito()
});

function verCarrito(){
    $('#carrito').removeClass('carrito-hidden')
    $('#carrito').addClass('carrito-visible')
    
}

function ocultarCarrito(){
    $('#carrito').removeClass('carrito-visible')
    $('#carrito').addClass('carrito-hidden')

}



function agregarAlCarrito() {
    let precio = document.getElementById('precio').getAttribute("data-valor") ///inner text lee el texto
    let imagen = document.getElementById('imagen').getAttribute('src') //asi leemos la imagen
    let titulo = document.getElementById('titulo').innerText
    let cantidad = parseInt(document.getElementById('quantity').value) //este es value porque es un input
    let id = document.getElementById('detalle_libro').getAttribute("data-id")
    // Verificar si el producto ya está en el carrito
    let carrito  = JSON.parse(localStorage.getItem("carrito")) //esta guardado tipo string gy con parse lo volvemos a array de objetos
    const productoExistente = carrito.find(item => item.titulo === titulo);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        productoExistente.cantidad = parseInt(productoExistente.cantidad) + cantidad;
    } else {
        // Si el producto no está en el carrito, añádelo
        carrito.push({
            id:id,
            titulo: titulo,
            precio: precio,
            cantidad: cantidad,
            imagen: imagen
        });
    }
    localStorage.setItem("carrito",JSON.stringify(carrito))//actualizamos el valor de la variable y el stringfy poara convertirlo en string
    generarCarrito();
}

function actualizarTotal() {
    let subtotal = 0;
    let carrito  = JSON.parse(localStorage.getItem("carrito"))

    carrito.forEach(item => {
        subtotal += parseFloat(item.precio) * item.cantidad;
    });

    document.getElementById('subtotal').innerHTML = `
    <p>Total:</p>
    <p>$${subtotal.toLocaleString('es-AR')},00</p>
    `;

    localStorage.setItem("carrito",JSON.stringify(carrito))
}

function generarCarrito() {
    const cartItems = document.getElementById('contenido-carrito');
    cartItems.innerHTML = '';
    const content_items = document.createElement('div');
    content_items.className = 'cart';
    content_items.innerHTML = '<h2 class="carrito_titulo">Carrito de compras</h2>'
    let carrito  = JSON.parse(localStorage.getItem("carrito")) 

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

    const subtotal = document.createElement('div');


    subtotal.innerHTML = `
    <div class="subtotal" id="subtotal">
        <p>Total:</p>
        <p>$201.950,00</p>
    </div>
    <div class="mt-4">
        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary" onclick="accionBotonCarrito('comprar')">Comprar</button>
        </div>
    </div>`

    cartItems.appendChild(subtotal)

    actualizarTotal();
}

function cambiarCantidad(index, change, newValue) {
    let carrito  = JSON.parse(localStorage.getItem("carrito")) 
    if (change !== 0) {
        carrito[index].cantidad += change;
    } else {
        carrito[index].cantidad = parseInt(newValue, 10);
    }
    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
    localStorage.setItem("carrito",JSON.stringify(carrito))
    generarCarrito();

}

function eliminarItem(index) {
    let carrito  = JSON.parse(localStorage.getItem("carrito")) 
    carrito.splice(index, 1);
    localStorage.setItem("carrito",JSON.stringify(carrito))
    generarCarrito();
}

function accionBotonCarrito(accion) {
    switch (accion) {
        case 'volver':
            $('#forma_pago').removeClass('step-active')
            $('#forma_pago').addClass('step-exit')
            $('#contenido-carrito').removeClass('step-exit')
            $('#contenido-carrito').addClass('step-active')
            break;
        case 'comprar':
            $('#contenido-carrito').removeClass('step-active')
            $('#contenido-carrito').addClass('step-exit')

            $('#forma_pago').removeClass('step-exit')
            $('#forma_pago').addClass('step-active')

            document.getElementById('fecha_de_entrega').innerHTML=obtenerFechaHoy()

            break;
        case 'finalizar':

            $('#seccion_finalizar_compra').removeClass('step-exit')
            $('#seccion_finalizar_compra').addClass('step-active')

            $('#forma_pago').removeClass('step-active')
            $('#forma_pago').addClass('step-exit')

        break;
    }
}


      async function cargarSucursalesDeRetiro(){

            try {
                
                let url = "http://localhost:3090/branches/select_branches"
                let response = await fetch(url);
                let data = await response.text()

                document.getElementById('sucursal').innerHTML=data
    
          
    
        } catch (error) {
            console.log(error);
                
            }
           
        }



        function obtenerFechaHoy() {
            const hoy = new Date();
    
            // Sumar 7 días
            hoy.setDate(hoy.getDate() + 7);

            const dia = String(hoy.getDate()).padStart(2, '0');
            const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
            const anio = hoy.getFullYear();

            return `${dia}/${mes}/${anio}`;
        }
        

function convertirFechaAnsi(fecha_de_entrega) {
    const [dia, mes, anio] = fecha_de_entrega.split('/'); // Separamos el string por '/'
    
    // Devolvemos la fecha en formato yyyy-mm-dd
    return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}


async function finalizar_compra(){

    let id_usuario = localStorage.getItem("id_user")
    let id_sucursal =  document.getElementById("sucursal").value
    let medioPago=document.getElementById("medio_pago").value
    let num_tarjeta =  document.getElementById("numero_tarjeta").value
    let tit_tarjeta = document.getElementById("titular_tarjeta").value
    let mes_expiracion =  document.getElementById("expiryMonth").value
    let anio_expiracion = document.getElementById("expiryYear").value
    let correo = document.getElementById("correo").value
    let codigo_seguridad = document.getElementById("securityCode").value
    let fecha_de_entrega =convertirFechaAnsi(document.getElementById("fecha_de_entrega").innerText)
    
    let carrito  = JSON.parse(localStorage.getItem("carrito")) 
    let detalle = []


    let datos_pago = {
        num_tarjeta,
        tit_tarjeta,
        mes_expiracion,
        anio_expiracion,
        id_usuario,
        id_sucursal,
        medioPago,
        correo,
        codigo_seguridad,
        fecha_de_entrega

    }


    for (const item of carrito) {
        
        detalle.push({
            id_libro:item.id,
            cantidad:item.cantidad,
            precio:item.precio

        })

    }

    datos_pago.detalle = detalle

    try {
        


        let url = "http://localhost:3090/compra"
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos_pago),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

    

} catch (error) {
    console.log(error);
        
    }
    
}


function medioPago(){

    let medioPago=document.getElementById("medio_pago").value
    
        if(medioPago=="EFECTIVO"){

            $('#cardFields').addClass('d-none');
            document.getElementById("numero_tarjeta").value = ""
            document.getElementById("titular_tarjeta").value = ""
            document.getElementById("expiryMonth").value = ""
            document.getElementById("expiryYear").value = ""



        }else{

            $('#cardFields').removeClass('d-none');
        }
            
 }




















cargarSucursalesDeRetiro()