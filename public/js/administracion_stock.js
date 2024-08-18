const get_all_stock = () => {
    let columns = [
        { data: 'libro' },//nombre del campo de la base de datos
        { data: 'cantidad' },
        { data: 'sucursal' },
    ]
    let columnDefs = [
        {
            targets: 3, // quiere decir que en la columna seis retorne ese boton
            render: function () {
                return `
                <div class="d-flex">
                    <button class="btn btn-secondary editar">Editar</button>
                    <button class="btn btn-secondary borrar ml-2">Borrar</button>
                </div>
                `;
            }
        }
    ]
    generar_datatable('datatable_stock', "http://localhost:3090/stock/get_all_stock", columns, columnDefs, eventos_tabla)
    //no tendria que agarrar por id al datatable_usuarios??

}


function eventos_tabla() {
    // Agregar evento de clic a los botones editar y borrar
    
    $(`#datatable_stock tbody `).on('click','tr .editar', function () {
        var tr_fila = $(this).closest('tr');//obtengo el elemento tr padre (el td esta dentro del tr) tr seleccionado
        $('.row_selected').removeClass('row_selected') //aca elimino todas las clases de los elemetnos que la tengan con jquery , .row_seleted devulve un array y devuleve todos los elementos que tengan esa clase
        $(tr_fila).addClass('row_selected') // aca agrego la clase a la fila seleccionada
        //la linera 31 y 32 son necesarioas para poder identificar el tr en la funcion guardar
        var grilla = $('#datatable_stock').DataTable();//aca obtengo los datos de todas las filas
        var data = grilla.row(tr_fila).data();// aca estoy diciendo que de la fila que seleccione me traiga los datos , es decir , id , nombre , email
        //para poder usarlo luego si es necesario.
        console.log(data.id)
        get_stock_by_id_editar(data.id)
    });

    $(`#datatable_stock tbody `).on('click','tr .borrar', function () {
        var tr_fila = $(this).closest('tr'); //aca estamos agarrando la fila seleccionada? si es asi porque en el put agarramos la fila por la clase?

        var data = grilla.row(tr_fila).data();

        mostrarConfirmacion(
            '¿Estás seguro?',
            '¡No podrás revertir esto!',
            function () {
                // Acciones a realizar si se confirma la acción
                delete_fila(data.id,tr_fila) //el id lo necesitamos para que en el fetch me elimine el libro que seleccione y el tr para saber que fila eliminar en el momento sin necesidad de recargar la pagina
            }
        );

    });
}



get_all_stock();//con esta funcion generamos el datatable



const get_stock_by_id_editar = async (id) => {
    
    try {
        const url = `http://localhost:3090/stock/get_stock_by_id_editar/${id}`;
        const response = await fetch(url);
        const html = await response.text();
        
        document.getElementById("formulario_planilla_stock").innerHTML=html

        cargar_libros()
        cargar_sucursales()

    } catch (error) {
        console.log(error);
    }
}




const delete_fila = async (id,tr) => {

    try {
        const url = `http://localhost:3090/stock/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
;
        grilla.row(tr).remove().draw(); //.draw(): Redibuja la tabla para reflejar los cambios realizados. Esto es necesario para actualizar la vista de la tabla después de eliminar una fila.

    } catch (error) {
        console.log(error)
    }



}


const guardar_stock = async () => {



    let id_libro = document.getElementById('libro').value
    let texto_libro = libro.options[libro.selectedIndex].text
    let cantidad = document.getElementById('cantidad').value
    let id_sucursal = document.getElementById('sucursal').value
    let texto_sucursal = sucursal.options[sucursal.selectedIndex].text

    let id = id_stock.value
    let url = `http://localhost:3090/stock`;

    console.log(id)




    let stock_sucursales = {
        libro: id_libro,
        cantidad: cantidad,
        sucursal: id_sucursal,

    }

    //porque al datatable le tengo que mandar un objeto

    let metodo = 'POST'

    if (id != 0) {
        url = `http://localhost:3090/stock/${id}`
        metodo = 'PUT'
        console.log("Hola estoy haciendo un put")
    }

    try {
        const response = await fetch(url, {
            method: metodo,
            body: JSON.stringify(stock_sucursales),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (id == 0) {
            if(data.status == 1){
                stock_sucursales.id = data.id//asignamos el id devuelvo al objeto para actualizar la fila con el nuevo usuario y despues tener el id en caso de querer editarlo o eliminarlo
                stock_sucursales.libro = texto_libro
                stock_sucursales.sucursal = texto_sucursal
                grilla.row.add(stock_sucursales).draw()
                limpiar_campos()
            }

        } else {
            if(data.status == 1){
                let tr=  $('.row_selected')[0] // devuelve los elementos que tienen esa clase , pongo corchetes porque devuleve un array asi me quedo solo con el elemento puro
                var indiceFila = grilla.row(tr).index();
                // Modificar los datos en la DataTable
                stock_sucursales.id=id//nos sirve para actualizar la fila y tener los datos en el datatable
                stock_sucursales.libro = texto_libro
                stock_sucursales.sucursal = texto_sucursal
                grilla.row(indiceFila).data(stock_sucursales).draw(false);
            }
        }

        //aca estamos agregando el id al objeto , cuando devuleve los resultados

        mostrar_mensaje(data.message)

    } catch (error) {
        console.log(error)
    }




}



const cargar_libros = async () => {

    try {
        const url = `http://localhost:3090/books/select_books`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato texto



        document.getElementById('libro').insertAdjacentHTML('beforeend', data);
        //hicimos esto para que no me saque la opcion seleccione que tengo creada

        let libro_seleccionado = $('#libro').attr('data-valor')



        $('#libro').val(libro_seleccionado)
        // // Establecemos el valor del select 'libro' al ID del libro seleccionado previamente (si existe)
        //este lo hicimos asi porque no depende de nada
        //preguntamos si libro seleccionado es distinto de comilla porque si ponemos editar el data valor se carga con el id del libro pero si no seleccionamos nada queda sin valor , si pusimos editar se dispara el onchange que me trae las suscursales por libro seleccionado.
        if(libro_seleccionado != "") {
            
            $('#libro').trigger("change");
            //dispara el evento onchange del html que en el select de cines , y ejecuta una funcion cada vez que cambia el valor del select 

        }


    } catch (error) {
        console.log(error)
    }
}




const cargar_sucursales = async () => {

    try {
        const url = `http://localhost:3090/branches/select_branches`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato texto



        document.getElementById('sucursal').insertAdjacentHTML('beforeend', data);
        //hicimos esto para que no me saque la opcion seleccione que tengo creada

        let sucursal_seleccionado = $('#sucursal').attr('data-valor')



        $('#sucursal').val(sucursal_seleccionado)


        // if(sucursal_seleccionado != "") {
            
        //     $('#sucursal').trigger("change");
        //     //dispara el evento onchange del html que en el select de cines , y ejecuta una funcion cada vez que cambia el valor del select 

        // }


       

    } catch (error) {
        console.log(error)
    }
}

const nuevo_registro= (clase) => {

    //me ejecute
    $(clase).val(0)    
    // $('#libro').val('');
    // $('#sucursal').val('')
    
    }



cargar_libros()
cargar_sucursales()











