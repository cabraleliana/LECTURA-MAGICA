const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function agregar_sucursal(req){
    try {
        const query = `INSERT INTO branches (nombre, direccion,ciudad) VALUES ('${req.body.sucursal}', '${req.body.direccion}', '${req.body.ciudad}') ; select scope_identity() as id`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}