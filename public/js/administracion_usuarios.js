

const get_all_users = () => {
    let columns = [
        { data: 'name' },//nombre del campo de la base de datos
        { data: 'lastname' },
        { data: 'email' },
        { data: 'cellphone' },
    ]
    let columnDefs = [
        {
            targets: 4, // quiere decir que en la columna cinco retorne ese boton
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
    generar_datatable('datatable_usuarios', "http://localhost:3090/user/get_all_users", columns, columnDefs, eventos_tabla)
    //no tendria que agarrar por id al datatable_usuarios??
}


let id=0
function eventos_tabla() {
    // Agregar evento de clic a los botones editar y borrar
    console.log($(`#datatable_usuarios tbody tr .editar`))
    
    $(`#datatable_usuarios tbody `).on('click','tr .editar', function () {
        var tr = $(this).closest('tr');//obtengo el elemento tr padre (el td esta dentro del tr)
        $('.row_selected').removeClass('row_selected') //aca elimino todas las clases de los elemetnos que la tengan con jquery , .row_seleted devulve un array y devuleve todos los elementos que tengan esa clase
        $(tr).addClass('row_selected') // aca agrego la clase a la fila seleccionada
        //la linera 31 y 32 son necesarioas para poder identificar el tr en la funcion guardar
        var grilla = $('#datatable_usuarios').DataTable();//aca obtengo los datos de todas las filas
        var data = grilla.row(tr).data();// aca estoy diciendo que de la fila que seleccione me traiga los datos , es decir , id , nombre , email
        //para poder usarlo luego si es necesario.
        id=data.id
        get_user_by_id_para_editar(data.id)
    });

    $(`#datatable_usuarios tbody`).on('click','tr .borrar', function () {
        var tr = $(this).closest('tr');
        var data = grilla.row(tr).data();

        mostrarConfirmacion(
            '¿Estás seguro?',
            '¡No podrás revertir esto!',
            function () {
                // Acciones a realizar si se confirma la acción
                delete_fila(data.id,tr) //el id lo necesitamos para que en el fetch me elimine el libro que seleccione y el tr para saber que fila eliminar en el momento sin necesidad de recargar la pagina
            }
        );

    });
}

get_all_users();//con esta funcion generamos el datatable



const get_user_by_id_para_editar = async (id) => {
    
    try {
        const url = `http://localhost:3090/user/get_user_by_id/${id}`;
        const response = await fetch(url);
        const html = await response.text();
        console.log(html)
        
        document.getElementById("formulario_planilla_usuarios").innerHTML=html
   
    } catch (error) {
        console.log(error);
    }
}




const delete_fila = async (id,tr) => {

    try {
        const url = `http://localhost:3090/user/${id}`;
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


const guardar_usuario = async () => {

    let name = document.getElementById('name').value
    let lastname = document.getElementById('apellido').value
    let email = document.getElementById('email').value
    let cellphone = document.getElementById('celular').value

    let url = `http://localhost:3090/user`;




    let usuario = { 
        name: name,
        lastname: lastname,
        email: email,
        cellphone: cellphone,
    }

    console.log(usuario)


    
    //porque al datatable le tengo que mandar un objeto

    let metodo = 'POST'

    if (id != 0) {
        url = `http://localhost:3090/user/${id}`
        metodo = 'PUT'
    }

    try {
        const response = await fetch(url, {
            method: metodo,
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (id == 0) {
            if(data.status == 1){
                usuario.id = data.id
                grilla.row.add(usuario).draw()
                limpiar_campos()
            }

        } else {
            if(data.status == 1){
                let tr=  $('.row_selected')[0] // devuelve los elementos que tienen esa clase , pongo corchetes porque devuleve un array asi me quedo solo con el elemento puro
                var indiceFila = grilla.row(tr).index();
                // Modificar los datos en la DataTable
                usuario.id=id//nos sirve para actualizar la fila y tener los datos en el datatable
                grilla.row(indiceFila).data(usuario).draw(false);
            }
        }

        //aca estamos agregando el id al objeto , cuando devuleve los resultados

        mostrar_mensaje(data.message)

    } catch (error) {
        console.log(error)
    }




}





const nuevo_usuario = () => {

    document.getElementById("id_usuario").value = 0 //Para cuando le de a guardar sepa si es una alta o una modificacion 


}

