const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function delete_categoria_relacion(req){
    try {
        const query = `delete from categoria_subcategoria where id_categoria=${req.params.id_categoria}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}