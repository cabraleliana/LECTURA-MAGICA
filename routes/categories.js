const express = require('express')
const router = express.Router()
const categories = require('../controllers/categorias')



router.get('/get_all_categories', categories.listado)

router.get('/get_categorie_by_id_editar/:id', categories.buscarCategoria)

router.post('/', categories.add_categorie)

router.get('/select_categorias', categories.select_categorie)

router.get('/select_subcategorias', categories.select_subcategorie)


router.delete('/:id', categories.delete_categorie)

router.post('/add_categoria_relacion', categories.agregar_categoria_relacion)

router.delete('/delete_categoria_relacion/:id_categoria', categories.delete_categoria_relacion)

router.get('/read_subcategories/:id_categoria', categories.selectSubcategoriasFromCategoria)

router.get('/read_subcategories_by_categorie/:id_categoria', categories.select_subcategoria_pantalla_libros)











module.exports = (app) => {
    app.use('/categories', router)//agrego las rutas de user al app del servidor
    //exporto una funcion que dice usa /books mas las rutas que creo , al exportar este archivo me llevo la funcion para ejecutarla desde el index
}