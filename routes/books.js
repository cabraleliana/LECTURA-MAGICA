const express = require('express')
const router = express.Router()
const books = require('../controllers/libros')



router.get('/get_all_books', books.listado)

router.get('/select_books', books.select_book)

router.get('/get_book_by_id_editar/:id', books.get_book_by_id)

router.delete('/:id', books.delete_book)

router.put('/:id', books.modify_book)

router.post('/', books.add_book)

router.get('/libros_destacados', books.librosDestacados)

router.get('/detalle_libro/:id', books.detalle_libro)

router.get('/todos_libros_catalogo', books.librosCatalogo)

router.get('/libros_filtrados', books.libros_filtrados)




module.exports = (app) => {
    app.use('/books', router)//agrego las rutas de user al app del servidor
    //exporto una funcion que dice usa /books mas las rutas que creo , al exportar este archivo me llevo la funcion para ejecutarla desde el index
}