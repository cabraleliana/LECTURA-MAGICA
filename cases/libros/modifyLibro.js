const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function modify_book(req){
    try {
        const query = `update books set titulo='${req.body.titulo}', autor='${req.body.autor}', id_categoria='${req.body.categoria}', id_subcategoria='${req.body.subcategoria}',cantidad_paginas='${req.body.cantidad_paginas}', idioma='${req.body.idioma}',estado='${req.body.estado}' where id=${req.params.id}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}