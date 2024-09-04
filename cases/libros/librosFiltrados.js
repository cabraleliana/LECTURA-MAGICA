const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function libros_filtrados(req){
    try {

        let filtro = 'where 1=1' //iniciamos variable para que no rompa si no mando parametros

        if(req.query.id_categoria !=0){
            filtro+=  ` and id_categoria = ${req.query.id_categoria} `
        }
        if(req.query.id_subcategoria !=0){
            filtro+=  ` and id_subcategoria = ${req.query.id_subcategoria} `
        }
        if(req.query.titulo !=''){
            filtro+=  ` and titulo like '%${req.query.titulo}%' `
        }


        const query = `select titulo , precio from books 
        ${filtro}`
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        console.log(query)
        return results
    } catch (error) {
        return error;
    }
}