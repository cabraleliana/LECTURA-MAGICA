const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function libros_destacados(req){
    try {
        const query = `SELECT top 5 titulo, autor, precio
        FROM books`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}