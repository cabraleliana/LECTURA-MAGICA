const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function select_subcategoria_pantalla_libros(req){
    try {

        let query =  `select cs.id_subcategoria as id_subcategoria,s.nombre as subcategoria 
        from categoria_subcategoria as cs
        inner join subcategories as s on s.id = cs.id_subcategoria
        where id_categoria=${req.params.id_categoria} `
        const db = new Sql(config)
        let results= await db.ejecutar(query) //aca se conecta a la base y me trae los resultados que necesito
        ///results cines tiene un array de objetos es decir me trae todos los cines
       
        return results
    } catch (error) {
        return error;
    }
}