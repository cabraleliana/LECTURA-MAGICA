const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function select_subcategoria(req){
    try {

        let query_subcategories = 'Select id, nombre as subcategoria from subcategories'
        const db = new Sql(config)
        let results_subcategories = await db.ejecutar(query_subcategories) //aca se conecta a la base y me trae los resultados que necesito
        ///results cines tiene un array de objetos es decir me trae todos los cines
       
        return results_subcategories
    } catch (error) {
        return error;
    }
}