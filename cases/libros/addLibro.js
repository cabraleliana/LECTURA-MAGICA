const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function add_book(req){
    try {
        const query = `INSERT INTO books (titulo, autor, id_categoria, id_subcategoria,cantidad_paginas,idioma,estado,eliminado) VALUES ('${req.body.titulo}', '${req.body.autor}','${req.body.categoria}','${req.body.subcategoria}','${req.body.cantidad_paginas}','${req.body.idioma}','${req.body.estado}',0) ; select scope_identity() as id`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}