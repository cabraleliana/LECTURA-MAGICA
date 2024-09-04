const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function buscarLibro(req){
    try {
        const query = `SELECT b.id,b.titulo, b.autor, b.id_categoria, b.id_subcategoria, b.cantidad_paginas,b.idioma,b.estado, b.precio,FORMAT(b.precio, 'N2', 'es-ES') AS precio_formateado
        FROM books AS b
        INNER JOIN categories AS c ON b.id_categoria = c.id
        INNER JOIN subcategories AS s ON b.id_subcategoria = s.id
        where b.id=${req.params.id}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}