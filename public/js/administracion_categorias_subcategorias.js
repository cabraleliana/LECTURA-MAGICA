
const cargar_categorias_select = async () => {

    try {
        const url = `http://localhost:3090/categories/select_categorias`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato json



        document.getElementById('categoria').insertAdjacentHTML('beforeend', data);
        //hicimos esto para que no me saque la opcion seleccione que tengo creada

        let categoria_seleccionada = $('#categoria').attr('data-valor')



        $('#categoria').val(categoria_seleccionada)
        //este lo hicimos asi porque no depende de nada

        // if(cine_seleccionado != "") {
            
        //     $('#categorias').trigger("change");
        //     //dispara el evento onchange del html que en el select de cines , y ejecuta una funcion cada vez que cambia el valor del select 

        // }



    } catch (error) {
        console.log(error)
    }
}



const cargar_subcategorias_select = async () => {

    try {
        const url = `http://localhost:3090/categories/select_subcategorias`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato json



        document.getElementById('subcategoria').insertAdjacentHTML('beforeend', data);
        //hicimos esto para que no me saque la opcion seleccione que tengo creada


        aplicar_multiselect('subcategoria')

        //este lo hicimos asi porque no depende de nada

        // if(cine_seleccionado != "") {
            
        //     $('#categorias').trigger("change");
        //     //dispara el evento onchange del html que en el select de cines , y ejecuta una funcion cada vez que cambia el valor del select 

        // }



    } catch (error) {
        console.log(error)
    }
}


cargar_categorias_select()
cargar_subcategorias_select()



const guardar_categoria_subcategoria = async () => {

let url_add = `http://localhost:3090/categories/add_categoria_relacion`;
let url_delete = `http://localhost:3090/categories/delete_categoria_relacion`;

let array_subcategorias = $('#subcategoria').val()
let id_categoria = $('#categoria').val()
let datos = []

for (const id_subcategoria of array_subcategorias) {
    datos.push({id_categoria,id_subcategoria})
}



try {

    let response = await fetch(`${url_delete}/${id_categoria}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    })





     response = await fetch(url_add, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
   
    mostrar_mensaje(data.message)

} catch (error) {
    console.log(error)
}

}

async function on_change_categoria(){
try {
    let id_categoria = $('#categoria').val() //leemos el valor de la categoria seleccionada

    let response = await fetch(`http://localhost:3090/categories/read_subcategories/${id_categoria}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })

    const results = await response.json();
    console.log(results.data)

    // multiselect_desmarcar_todos('#subcategoria')

    $('#subcategoria').val(results.data);//todas las opciones que tengas de value los ids que yo le digo me los selecciona 

    // Refrescar el multiselect para reflejar los cambios
    $('#subcategoria').multiSelect('refresh');

} catch (error) {
    
}
}