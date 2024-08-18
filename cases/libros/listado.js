const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function listado(req){
    try {
        const query = `SELECT b.id, b.titulo, b.autor, c.nombre AS categoria, s.nombre AS subcategoria, b.cantidad_paginas,b.idioma,b.estado
        FROM books AS b
        INNER JOIN categories AS c ON b.id_categoria = c.id
        INNER JOIN subcategories AS s ON b.id_subcategoria = s.id
        where eliminado=0`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}