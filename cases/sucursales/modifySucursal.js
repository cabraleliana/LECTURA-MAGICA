const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function modify_sucursal(req){
    try {
        const query = `update branches set nombre='${req.body.sucursal}', direccion='${req.body.direccion}', ciudad='${req.body.ciudad}' 
        where id=${req.params.id}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}