const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function listado(req){
    try {
        const query = `select s.id,b.titulo as libro , s.cantidad , bc.nombre as sucursal
        from stock as s
        inner join books as b on s.id_libro = b.id
        inner join branches as bc on s.id_sucursal = bc.id`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}