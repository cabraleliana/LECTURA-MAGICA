const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function select_book(req){
    try {

        let query_books = 'Select id, titulo from books'
        const db = new Sql(config)
        let results_books = await db.ejecutar(query_books) //aca se conecta a la base y me trae los resultados que necesito
        ///results cines tiene un array de objetos es decir me trae todos los cines
       
        return results_books
    } catch (error) {
        return error;
    }
}