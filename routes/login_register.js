const express = require('express')
const router = express.Router()
const login_register = require('../controllers/usuarios')



router.post('/register', login_register.register)
router.get('/verify_login', login_register.verify_login)


module.exports = (app) => {
    app.use('/', router)//agrego las rutas de user al app del servidor
}