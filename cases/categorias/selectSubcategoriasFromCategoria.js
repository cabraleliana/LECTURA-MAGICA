const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function select_categoria(req){
    try {

        let query =  `select string_agg(id_subcategoria,',') as ids 
        from categoria_subcategoria
        where id_categoria=${req.params.id_categoria} `
        const db = new Sql(config)
        let results= await db.ejecutar(query) //aca se conecta a la base y me trae los resultados que necesito
        ///results cines tiene un array de objetos es decir me trae todos los cines
       
        return results[0].ids
    } catch (error) {
        return error;
    }
}