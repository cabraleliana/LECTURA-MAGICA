const Sql = require('../../db_sql') //aca estoy recibiendo la clase entera
const config = require('../../config/config').config

module.exports = async function pedido(req){
    try {
        let query = `
        declare @id_pedido int 
        INSERT INTO pedido (id_usuario, id_sucursal, medio_pago, numero_tarjeta,titular,mes_vencimiento,anio_vencimiento,fecha_entrega,codigo_seguridad,correo) VALUES ('${req.body.id_usuario}', '${req.body.id_sucursal}','${req.body.medioPago}','${req.body.num_tarjeta}','${req.body.tit_tarjeta}','${req.body.mes_expiracion}','${req.body.anio_expiracion}','${req.body.fecha_de_entrega}','${req.body.codigo_seguridad}','${req.body.correo}') ; 
        set @id_pedido = (select scope_identity())`
        
        let detalle = req.body.detalle
        
        
        for (const item of detalle) {
            query += `INSERT INTO pedido_detalle (id_pedido, id_libro, cantidad, precio) VALUES (@id_pedido, ${item.id_libro},${item.cantidad},${item.precio});`
        }

        console.log(query)
        
        const db = new Sql(config)
        const results = await db.ejecutar(query)

        

        return results
    } catch (error) {
        return error;
    }
}