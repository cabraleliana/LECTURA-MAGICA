const get_all_books = () => {
    let columns = [
        { data: 'titulo' },//nombre del campo de la base de datos
        { data: 'autor' },
        { data: 'categoria' },
        { data: 'subcategoria' },
        { data: 'cantidad_paginas' },
        { data: 'idioma' },
        { data: 'estado' },
    ]
    let columnDefs = [
        {
            targets: 7, // quiere decir que en la columna seis retorne ese boton
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
    generar_datatable('datatable_libros', "http://localhost:3090/books/get_all_books", columns, columnDefs, eventos_tabla)
    //no tendria que agarrar por id al datatable_usuarios??
}

// let id=0;

function eventos_tabla() {
    // Agregar evento de clic a los botones editar y borrar
    
    $(`#datatable_libros tbody `).on('click','tr .editar', function () {
        var tr_fila = $(this).closest('tr');//obtengo el elemento tr padre (el td esta dentro del tr) reconoce que fila aprete??
        $('.row_selected').removeClass('row_selected') //aca elimino todas las clases de los elemetnos que la tengan con jquery , .row_seleted devulve un array y devuleve todos los elementos que tengan esa clase
        $(tr_fila).addClass('row_selected') // aca agrego la clase a la fila seleccionada
        //la linera 31 y 32 son necesarioas para poder identificar el tr en la funcion guardar
        var grilla = $('#datatable_libros').DataTable();//aca obtengo los datos de todas las filas
        var data = grilla.row(tr_fila).data();// aca estoy diciendo que de la fila que seleccione me traiga los datos , es decir , id , nombre , email
        //para poder usarlo luego si es necesario.
        console.log(data.id)
        // id=data.id
       get_book_by_id_editar(data.id)
    });

    $(`#datatable_libros tbody `).on('click','tr .borrar', function () {
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

get_all_books();//con esta funcion generamos el datatable



const get_book_by_id_editar = async (id) => {
    
    try {
        const url = `http://localhost:3090/books/get_book_by_id_editar/${id}`;
        const response = await fetch(url);
        const html = await response.text();
        
        document.getElementById("formulario_planilla_libros").innerHTML=html

        cargar_categorias_select_pantalla_libros()
   
    } catch (error) {
        console.log(error);
    }
}




const delete_fila = async (id,tr) => {

    try {
        const url = `http://localhost:3090/books/${id}`;
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


const guardar_libro = async () => {



    let titulo = document.getElementById('titulo').value
    let autor = document.getElementById('autor').value
    let categoria = categoria_pantalla_libros.value
    let texto_categoria = categoria_pantalla_libros.options[categoria_pantalla_libros.selectedIndex].text
    let subcategoria = subcategoria_pantalla_libros.value
    let texto_subcategoria = subcategoria_pantalla_libros.options[subcategoria_pantalla_libros.selectedIndex].text
    let cantidad_paginas= document.getElementById('paginas').value
    let idioma = document.getElementById('idioma').value
    let estado = document.getElementById('estado').value
    let id= id_libro.value
    let url = `http://localhost:3090/books`;

    console.log(id)




    let libro = {
        titulo: titulo,
        autor: autor,
        categoria: categoria,
        subcategoria: subcategoria,
        cantidad_paginas: cantidad_paginas,
        idioma: idioma,
        estado: estado,
    }

    //porque al datatable le tengo que mandar un objeto

    let metodo = 'POST'

    if (id != 0) {
        url = `http://localhost:3090/books/${id}`
        metodo = 'PUT'
        console.log("Hola estoy haciendo un put")
    }

    try {
        const response = await fetch(url, {
            method: metodo,
            body: JSON.stringify(libro),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (id == 0) {
            if(data.status == 1){
                libro.id = data.id//asignamos el id devuelvo al objeto para actualizar la fila con el nuevo usuario
                libro.categoria = texto_categoria
                libro.subcategoria = texto_subcategoria
                grilla.row.add(libro).draw()
                limpiar_campos()
            }

        } else {
            if(data.status == 1){
                let tr=  $('.row_selected')[0] // devuelve los elementos que tienen esa clase , pongo corchetes porque devuleve un array asi me quedo solo con el elemento puro
                var indiceFila = grilla.row(tr).index();
                // Modificar los datos en la DataTable
                libro.id=id//nos sirve para actualizar la fila y tener los datos en el datatable
                libro.categoria = texto_categoria
                libro.subcategoria = texto_subcategoria
                grilla.row(indiceFila).data(libro).draw(false);
            }
        }

        //aca estamos agregando el id al objeto , cuando devuleve los resultados

        mostrar_mensaje(data.message)

    } catch (error) {
        console.log(error)
    }




}





const cargar_categorias_select_pantalla_libros = async () => {

    try {
        const url = `http://localhost:3090/categories/select_categorias`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato json

        console.log(data)

        document.getElementById('categoria_pantalla_libros').insertAdjacentHTML('beforeend', data);
        //hicimos esto para que no me saque la opcion seleccione que tengo creada

        let categoria_seleccionada = $('#categoria_pantalla_libros').attr('data-valor')



        $('#categoria_pantalla_libros').val(categoria_seleccionada)
       

        if(categoria_seleccionada != "") {
            
            $('#categoria_pantalla_libros').trigger("change");
            //dispara el evento onchange del html que en el select de cines , y ejecuta una funcion cada vez que cambia el valor del select 

        }



    } catch (error) {
        console.log(error)
    }
}



const cargar_subcategorias_select_pantalla_libros_by_categoria = async () => {

    let id = categoria_pantalla_libros.value

    try {
        const url = `http://localhost:3090/categories/read_subcategories_by_categorie/${id}`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato json



        document.getElementById('subcategoria_pantalla_libros').insertAdjacentHTML('beforeend', data);
        //hicimos esto para que no me saque la opcion seleccione que tengo creada



            $(`#subcategoria_pantalla_libros`).html(data)
            //este pisa todo el tiempo la info del select , ya que al cambiar todo el tiempo  , queda la info de la sucursal anterior
            $(`#subcategoria_pantalla_libros`).prepend("<option value=''>Seleccione subcategoria</option>");
            //lo puse despues del insert porque sino se pisa con el html
            $(`#subcategoria_pantalla_libros`).val($(`#subcategoria_pantalla_libros`).attr('data-valor'))
            //selecciona el atributo que tengo en data valor y me marca la pelicula que corresponda

    } catch (error) {
        console.log(error)
    }
}


cargar_categorias_select_pantalla_libros()






