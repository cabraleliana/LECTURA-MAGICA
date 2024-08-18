const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function agregar_categoria_relacion(req){

    try {


        let array_subcategorias = req.body
        console.log(array_subcategorias)

        let query=''
        for (const item of array_subcategorias) {
            //cada item es un objeto
            query += `INSERT INTO categoria_subcategoria (id_categoria,id_subcategoria) VALUES ('${item.id_categoria}','${item.id_subcategoria}') ;`

        }
        const db = new Sql(config)
        const results = await db.ejecutar(query)
        return results
    } catch (error) {
        return error;
    }
}