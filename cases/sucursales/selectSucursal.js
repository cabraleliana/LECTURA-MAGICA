const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function select_sucursal(req){
    try {
        const query = `select b.id , b.nombre as sucursal 
        from branches as b
        inner join stock as s on s.id_sucursal = b.id
        where s.id_libro=${req.params.id}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}