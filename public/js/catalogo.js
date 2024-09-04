const todos_libros = async (id) => {
    
    try {
        const url = `http://localhost:3090/books/todos_libros_catalogo`;
        const response = await fetch(url);
        const data = await response.text();
        console.log(data)
        document.getElementById('catalogo').innerHTML=data

    } catch (error) {
        console.log(error);
    }
}

todos_libros()


const cargar_libros_filtrados = async () => {
    
    try {

        let id_categoria = categoryFilter.value
        let id_subcategoria = subcategoryFilter.value
        let titulo = bookFilter.value
    
        let url = `http://localhost:3090/books/libros_filtrados?id_categoria=${id_categoria}&id_subcategoria=${id_subcategoria}&titulo=${titulo}`;
        let response = await fetch(url);
        let data = await response.text();
        console.log(data)
        document.getElementById('catalogo').innerHTML=data        

    } catch (error) {
        console.log(error);
    }
}


const cargar_categorias_filtro = async () => {

    try {
        const url = `http://localhost:3090/categories/select_categorias`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato json



        document.getElementById('categoryFilter').insertAdjacentHTML('beforeend', data);
        //hicimos esto para que no me saque la opcion seleccione que tengo creada

    } catch (error) {
        console.log(error)
    }
}



const onhchange_cargar_subcategorias_filtro = async () => {

    let id_categoria = categoryFilter.value

    try {
        const url = `http://localhost:3090/categories/read_subcategories_by_categorie/${id_categoria}`;


        const response = await fetch(url);
        const data = await response.text(); //transformo los datos en formato json


        // document.getElementById('subcategoria_pantalla_libros').insertAdjacentHTML('beforeend', data);
        //este codigo de la linea 53 simplemente agrega al select opciones sin elinminar las anteriores cargadas , asique es incorrecto


        $(`#subcategoryFilter`).html(data)
        //este pisa todo el tiempo la info del select , ya que al cambiar todo el tiempo  , queda la info de la subcategoria anterior
        $(`#subcategoryFilter`).prepend("<option value='' selected>Seleccione subcategoria</option>");
        //la propiedad selected se asegura que el seleccione quede marcado
        //lo puse despues del insert porque sino se pisa con el html
        // $(`#subcategoryFilter`).val($(`#subcategoryFilter`).attr('data-valor')) 
        //esta linea solo sirve cuando tengo un editar , es decir , al seleccionar una fila con ese id lo lleno en el front
        //selecciona el atributo que tengo en data valor y me marca la subcategoria que corresponda

        cargar_libros_filtrados()


    } catch (error) {
        console.log(error)
    }
}




const onhchange_cargar_libros_by_subcategoria = async () => {

   cargar_libros_filtrados()

}




const onchange_cargar_libro_by_titulo = async () => {


    cargar_libros_filtrados()


}



const cargar_libros_by_titulo = async (titulo) => {
    
    try {
            
            let url = `http://localhost:3090/books/libros_by_titulo/${titulo}`;
            let response = await fetch(url);
            let data = await response.text();
            console.log(data)
            document.getElementById('catalogo').innerHTML=data

      

    } catch (error) {
        console.log(error);
    }
    
}


cargar_categorias_filtro()

const ver_detalle_libro =  (id) => {
    
    location.href=`http://localhost:3090/books/detalle_libro/${id}`

}