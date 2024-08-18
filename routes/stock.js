const express = require('express')
const router = express.Router()
const stock = require('../controllers/stock')



router.get('/get_all_stock', stock.listado)

router.get('/get_stock_by_id_editar/:id', stock.buscarStock)

router.post('/', stock.add_stock)





module.exports = (app) => {
    app.use('/stock', router)//agrego las rutas de user al app del servidor
    //exporto una funcion que dice usa /books mas las rutas que creo , al exportar este archivo me llevo la funcion para ejecutarla desde el index
}