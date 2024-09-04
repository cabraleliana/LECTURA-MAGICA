const caso_listado = require("../cases/libros/listado.js")
const caso_buscarLibro = require("../cases/libros/buscarLibro.js")
const caso_deleteLibro = require("../cases/libros/deleteLibro.js")
const caso_addLibro = require("../cases/libros/addLibro.js")
const caso_modifyLibro = require("../cases/libros/modifyLibro.js")
const caso_selectLibro = require("../cases/libros/selectLibro.js")
const caso_librosDestacados = require("../cases/libros/librosDestacados.js")
const caso_detalle_libro = require("../cases/libros/detalle_libro.js")
const caso_libros_catalogo = require("../cases/libros/todosLibrosCatalogo.js")
const caso_libros_by_categoria = require("../cases/libros/librosByCategoria.js")
const caso_libros_by_categoria_subcategoria= require("../cases/libros/librosByCategoriaSubcategoria.js")
const caso_libros_filtrados= require("../cases/libros/librosFiltrados.js")
const librosFiltrados = require("../cases/libros/librosFiltrados.js")

const libros_filtrados= async (req, res) => {
    try {
        
       let result = await caso_libros_filtrados(req);

       

       console.log(result)

       res.render('./pages/libros.ejs', {data: result})

       


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const librosCatalogo = async (req, res) => {
    try {
        
       let result = await caso_libros_catalogo(req);

       console.log(result)

       res.render('./pages/libros.ejs', {data: result})

       


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const librosDestacados = async (req, res) => {
    try {
        
       let result = await caso_librosDestacados(req);

       console.log(result)

       res.render('./pages/libros_destacados.ejs', {data: result})

       


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const listado = async (req, res) => {
    try {
        let result = await caso_listado(req);
        res.status(200).json({ status: 1, data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const get_book_by_id = async (req, res) => {
    try {
        
       let result = await caso_buscarLibro(req);

       console.log(result)

       res.render('./pages/formulario_libros.ejs', {data: result})

       


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const delete_book = async (req, res) => {
    try {
        
       let result = await caso_deleteLibro(req);

       res.status(200).json({ status: 1, message: 'Libro eliminado exitosamente', result })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const add_book = async (req, res) => {
    try {
        
       let result = await caso_addLibro(req);

       res.status(200).json({ status: 1, message: 'Libro insertado exitosamente', id:result[0].id })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const modify_book = async (req, res) => {
    try {
        
       let result = await caso_modifyLibro(req);

       res.status(200).json({ status: 1, message: 'Libro actualizado exitosamente' })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}


const select_book = async (req, res) => {
    try {
        
       let result = await caso_selectLibro(req);


       opcionesGeneradas=""

        result.forEach((opcion) => {
            opcionesGeneradas += `<option value="${opcion.id}">${opcion.titulo}</option>`;
            
          }); //este for each genera opciones para inyectarlas en el select del front . Mejor procesarlo en el back ya que se procesa todo en el servidor (mas rapido) y no del lado del cliente ( en caso que tengan maquina lenta )

          
        res.status(200).send(opcionesGeneradas)



    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const detalle_libro = async (req, res) => {
    try {
        
       let result = await caso_detalle_libro(req);

       console.log(result)

       res.render('./pages/detalle_libro.ejs', {data: result[0]})

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

module.exports = {
   listado,
   get_book_by_id,
   delete_book,
   add_book,
   modify_book,
   select_book,
   librosDestacados,
   detalle_libro,
   librosCatalogo,
   libros_filtrados
};