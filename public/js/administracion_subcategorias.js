const get_all_subcategories = () => {
    let columns = [
        { data: 'subcategorias' },//nombre del campo de la base de datos
    ]
    let columnDefs = [
        {
            targets: 1, // quiere decir que en la columna seis retorne ese boton
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
    generar_datatable('datatable_subcategorias', "http://localhost:3090/subcategories/get_all_subcategories", columns, columnDefs, eventos_tabla)
    //no tendria que agarrar por id al datatable_usuarios??
}


function eventos_tabla() {
    // Agregar evento de clic a los botones editar y borrar
    
    $(`#datatable_subcategorias tbody `).on('click','tr .editar', function () {
        var tr_fila = $(this).closest('tr');//obtengo el elemento tr padre (el td esta dentro del tr) reconoce que fila aprete??
        $('.row_selected').removeClass('row_selected') //aca elimino todas las clases de los elemetnos que la tengan con jquery , .row_seleted devulve un array y devuleve todos los elementos que tengan esa clase
        $(tr_fila).addClass('row_selected') // aca agrego la clase a la fila seleccionada
        //la linera 31 y 32 son necesarioas para poder identificar el tr en la funcion guardar
        var grilla = $('#datatable_subcategorias').DataTable();//aca obtengo los datos de todas las filas
        var data = grilla.row(tr_fila).data();// aca estoy diciendo que de la fila que seleccione me traiga los datos , es decir , id , nombre , email
        //para poder usarlo luego si es necesario.
        console.log(data.id)
        // id=data.id
       get_subcategorie_by_id_editar(data.id)
    });

    $(`#datatable_subcategorias tbody `).on('click','tr .borrar', function () {
        var tr_fila = $(this).closest('tr');
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

get_all_subcategories();//con esta funcion generamos el datatable



const get_subcategorie_by_id_editar = async (id) => {
    
    try {
        const url = `http://localhost:3090/subcategories/get_subcategorie_by_id_editar/${id}`;
        const response = await fetch(url);
        const html = await response.text();
        
        document.getElementById("formulario_planilla_subcategorias").innerHTML=html

   
    } catch (error) {
        console.log(error);
    }
}




const delete_fila = async (id,tr) => {

    try {
        const url = `http://localhost:3090/subcategories/${id}`;
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


const guardar_sucursal = async () => {



    let subcategoria = subcategoria_pantalla_subcategoria.value
    let id= id_subcategoria_pantalla_subcategoria.value
    let url = `http://localhost:3090/subcategories`;

    console.log(id)




    let subcategorias = {
        subcategoria: subcategoria,
    }

    //porque al datatable le tengo que mandar un objeto

    let metodo = 'POST'

    if (id != 0) {
        url = `http://localhost:3090/subcategories/${id}`
        metodo = 'PUT'
        console.log("Hola estoy haciendo un put")
    }

    try {
        const response = await fetch(url, {
            method: metodo,
            body: JSON.stringify(subcategorias),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (id == 0) {
            if(data.status == 1){
                subcategorias.id = data.id//asignamos el id devuelvo al objeto para actualizar la fila con el nuevo usuario
                grilla.row.add(subcategorias).draw()
                limpiar_campos()
            }

        } else {
            if(data.status == 1){
                let tr=  $('.row_selected')[0] // devuelve los elementos que tienen esa clase , pongo corchetes porque devuleve un array asi me quedo solo con el elemento puro
                var indiceFila = grilla.row(tr).index();
                // Modificar los datos en la DataTable
                subcategorias.id=id//nos sirve para actualizar la fila y tener los datos en el datatable
                grilla.row(indiceFila).data(subcategorias).draw(false);
            }
        }

        //aca estamos agregando el id al objeto , cuando devuleve los resultados

        mostrar_mensaje(data.message)

    } catch (error) {
        console.log(error)
    }




}



