const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function add_user(req){
    try {
        const query = `INSERT INTO users (name, lastname, email, cellphone,eliminado) VALUES ('${req.body.name}', '${req.body.lastname}','${req.body.email}','${req.body.cellphone}',0) ; select scope_identity() as id`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}