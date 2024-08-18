const express = require('express')
const router = express.Router()
const subcategories = require('../controllers/subcategorias.js')



router.get('/get_all_subcategories', subcategories.listado)











module.exports = (app) => {
    app.use('/subcategories', router)//agrego las rutas de user al app del servidor
    //exporto una funcion que dice usa /books mas las rutas que creo , al exportar este archivo me llevo la funcion para ejecutarla desde el index
}