const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function listado(req){
    try {
        const query = `select id, nombre as sucursal,direccion,ciudad from branches`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        console.log(results)
        return results
    } catch (error) {
        return error;
    }
}