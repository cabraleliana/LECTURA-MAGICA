const caso_buscarCategoria = require("../cases/categorias/buscarCategoria.js")
const caso_listado = require("../cases/categorias/listado.js")
const caso_addCategorie = require("../cases/categorias/addCategoria.js")
const caso_deleteCategoria = require("../cases/categorias/deleteCategoria.js")
const caso_selectCategoria = require("../cases/categorias/selectCategoria.js")
const caso_selectSubcategoria = require("../cases/categorias/selectSubcategoria.js")
const caso_addCategoriaRelacion = require("../cases/categorias/addCategoriaRelacion.js")
const caso_deleteCategoriaRelacion = require("../cases/categorias/deleteCategoriaRelacion.js")
const caso_selectSubcategoriasFromCategoria = require("../cases/categorias/selectSubcategoriasFromCategoria.js")
const caso_selectSubcategoriaPantallaLibros = require("../cases/categorias/selectSubcategoriaPantallaLibros.js")

const selectSubcategoriasFromCategoria = async (req, res) => {
    try {
        let ids = await caso_selectSubcategoriasFromCategoria(req);

        const arrayIds = ids.split(',').map(num => parseInt(num));

        
        res.status(200).json({ status: 1, data: arrayIds })

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




const buscarCategoria = async (req, res) => {
    try {
        
       let result = await caso_buscarCategoria(req);

       res.render('./pages/formulario_categorias.ejs', {data: result})


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}


const add_categorie = async (req, res) => {
    try {
        
       let result = await caso_addCategorie(req);

       res.status(200).json({ status: 1, message: 'Categoria insertada exitosamente', id:result[0].id })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const delete_categorie = async (req, res) => {
    try {
        
       let result = await caso_deleteCategoria(req);

       res.status(200).json({ status: 1, message: 'Subcategoria eliminado exitosamente', result })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const select_categorie = async (req, res) => {
    try {
        
       let result = await caso_selectCategoria(req);

       opcionesGeneradas=""

        result.forEach((opcion) => {
            opcionesGeneradas += `<option value="${opcion.id}">${opcion.categoria}</option>`;
            
          }); //este for each genera opciones para inyectarlas en el select del front . Mejor procesarlo en el back ya que se procesa todo en el servidor (mas rapido) y no del lado del cliente ( en caso que tengan maquina lenta )

          
        res.status(200).send(opcionesGeneradas)



    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}


const select_subcategorie = async (req, res) => {
    try {
        
       let result = await caso_selectSubcategoria(req);

       opcionesGeneradas=""

        result.forEach((opcion) => {
            opcionesGeneradas += `<option value="${opcion.id}">${opcion.subcategoria}</option>`;
            
          }); //este for each genera opciones para inyectarlas en el select del front . Mejor procesarlo en el back ya que se procesa todo en el servidor (mas rapido) y no del lado del cliente ( en caso que tengan maquina lenta )

          
        res.status(200).send(opcionesGeneradas)



    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}




const agregar_categoria_relacion = async (req, res) => {
    try {
        
       let result = await caso_addCategoriaRelacion(req);

       res.status(200).json({ status: 1, message: 'Subcategoria eliminado exitosamente', result })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const delete_categoria_relacion = async (req, res) => {
    try {
        
       let result = await caso_deleteCategoriaRelacion(req);

       res.status(200).json({ status: 1, message: 'Subcategoria eliminado exitosamente', result })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const select_subcategoria_pantalla_libros = async (req, res) => {
    try {
        
       let result = await caso_selectSubcategoriaPantallaLibros(req);

       console.log(result)

       opcionesGeneradas=""

       result.forEach((opcion) => {
           opcionesGeneradas += `<option value="${opcion.id_subcategoria}">${opcion.subcategoria}</option>`;
           
         }); //este for each genera opciones para inyectarlas en el select del front . Mejor procesarlo en el back ya que se procesa todo en el servidor (mas rapido) y no del lado del cliente ( en caso que tengan maquina lenta )

         
       res.status(200).send(opcionesGeneradas)


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

module.exports = {
    listado,
    buscarCategoria,
    add_categorie,
    delete_categorie,
    select_categorie,
    select_subcategorie,
    agregar_categoria_relacion,
    delete_categoria_relacion,
    selectSubcategoriasFromCategoria,
    select_subcategoria_pantalla_libros
 };