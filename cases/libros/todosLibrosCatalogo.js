const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function todos_libros_catalogo(req){
    try {
        const query = `SELECT id,titulo,precio
        FROM books`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}