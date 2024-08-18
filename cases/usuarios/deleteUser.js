const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function delete_user(req){
    try {
        const query = `delete from users where id=${req.params.id}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}