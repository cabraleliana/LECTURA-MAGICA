const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function libros_by_titulo(req){
    try {
        const query = `select titulo , precio from books 
        where titulo LIKE '%${req.params.titulo}%'`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        console.log(req.params)
        return results
    } catch (error) {
        return error;
    }
}