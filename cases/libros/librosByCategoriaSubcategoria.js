const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function libros_by_categoria_subcategoria(req){
    try {
        const query = `select titulo , precio from books 
        where id_categoria=${req.query.id_categoria} and id_subcategoria=${req.query.id_subcategoria}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        console.log(req.query)
        return results
    } catch (error) {
        return error;
    }
}