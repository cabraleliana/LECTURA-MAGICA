const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function select_categoria(req){
    try {

        let query_categories = 'Select id, nombre as categoria from categories'
        const db = new Sql(config)
        let results_categories = await db.ejecutar(query_categories) //aca se conecta a la base y me trae los resultados que necesito
        ///results cines tiene un array de objetos es decir me trae todos los cines
       
        return results_categories
    } catch (error) {
        return error;
    }
}