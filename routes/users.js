const express = require('express')
const router = express.Router()
const users = require('../controllers/usuarios')



router.get('/get_all_users', users.get_all_users)

router.get('/get_user_by_id/:id', users.get_user_by_id)

router.delete('/:id', users.delete_user)

router.post('/', users.add_user)

router.put('/:id', users.modify_user)



module.exports = (app) => {
    app.use('/user', router)//agrego las rutas de user al app del servidor
}