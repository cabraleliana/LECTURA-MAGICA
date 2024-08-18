const express = require('express')
const router = express.Router()
const sucursales = require('../controllers/sucursales')



router.get('/get_all_branches', sucursales.listado)

router.get('/get_branch_by_id_editar/:id', sucursales.get_branch_by_id)

router.get('/select_branch_by_libro/:id', sucursales.select_sucursal_by_libro)

router.delete('/:id', sucursales.delete_branch)

router.post('/', sucursales.add_sucursal)

router.put('/:id', sucursales.modify_sucursal)

router.get('/select_branches', sucursales.selectSucursales)




module.exports = (app) => {
    app.use('/branches', router)//agrego las rutas de user al app del servidor
}