const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function modify_user(req){
    try {
        const query = `update users set name='${req.body.name}', email='${req.body.email}', lastname='${req.body.lastname}',cellphone='${req.body.cellphone}' 
        where id=${req.params.id}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}