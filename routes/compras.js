const express = require('express')
const router = express.Router()
const compras = require('../controllers/compras')



router.post('/', compras.compras)



module.exports = (app) => {
    app.use('/compra', router)//agrego las rutas de user al app del servidor
}