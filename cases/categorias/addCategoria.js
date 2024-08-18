const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function agregar_categoria(req){
    try {
        const query = `INSERT INTO categories (nombre) VALUES ('${req.body.categoria}') ; select scope_identity() as id`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}