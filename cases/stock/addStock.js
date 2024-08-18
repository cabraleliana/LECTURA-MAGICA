const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function add_stock(req){
    try {
        const query = `INSERT INTO stock (id_libro, cantidad, id_sucursal,eliminado) VALUES ('${req.body.libro}', '${req.body.cantidad}','${req.body.sucursal}',0) ; select scope_identity() as id`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}