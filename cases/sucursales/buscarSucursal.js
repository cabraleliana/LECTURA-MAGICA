const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function buscarSucursal(req){
    try {
        const query = `select id, nombre as sucursal, direccion,ciudad
        from branches where id=${req.params.id}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}