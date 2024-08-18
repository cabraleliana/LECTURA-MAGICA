const caso_listado = require("../cases/sucursales/listado.js")
const caso_buscarSucursal = require("../cases/sucursales/buscarSucursal.js")
const caso_deleteSucursal = require("../cases/sucursales/deleteSucursal.js")
const caso_addSucursal = require("../cases/sucursales/addSucursal.js")
const caso_modifySucursal = require("../cases/sucursales/modifySucursal.js")
const caso_selectSucursal = require("../cases/sucursales/selectSucursal.js")
const caso_selectSucursales = require("../cases/sucursales/selectSucursales.js")




const listado = async (req, res) => {
    try {
        let result = await caso_listado(req);
        res.status(200).json({ status: 1, data: result })
        console.log(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const get_branch_by_id = async (req, res) => {
    try {
        
       let result = await caso_buscarSucursal(req);

       res.render('./pages/formulario_sucursales.ejs', {data: result})


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const delete_branch = async (req, res) => {
    try {
        
       let result = await caso_deleteSucursal(req);

       res.status(200).json({ status: 1, message: 'Sucursal eliminado exitosamente', result })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const add_sucursal = async (req, res) => {
    try {
        
       let result = await caso_addSucursal(req);

       res.status(200).json({ status: 1, message: 'Sucursal insertado exitosamente', id:result[0].id })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const modify_sucursal = async (req, res) => {
    try {
        
       let result = await caso_modifySucursal(req);

       res.status(200).json({ status: 1, message: 'Sucursal actualizado exitosamente' })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}


const select_sucursal_by_libro = async (req, res) => {
    try {
        
       let result = await caso_selectSucursal(req);

       opcionesGeneradas=""

        result.forEach((opcion) => {
            opcionesGeneradas += `<option value="${opcion.id}">${opcion.sucursal}</option>`;
            
          }); //este for each genera opciones para inyectarlas en el select del front . Mejor procesarlo en el back ya que se procesa todo en el servidor (mas rapido) y no del lado del cliente ( en caso que tengan maquina lenta )

          
        res.status(200).send(opcionesGeneradas)



    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const selectSucursales = async (req, res) => {
        try {
            
           let result = await caso_selectSucursales(req);
    
           opcionesGeneradas=""
    
            result.forEach((opcion) => {
                opcionesGeneradas += `<option value="${opcion.id}">${opcion.sucursal}</option>`;
                
              }); //este for each genera opciones para inyectarlas en el select del front . Mejor procesarlo en el back ya que se procesa todo en el servidor (mas rapido) y no del lado del cliente ( en caso que tengan maquina lenta )
    
              
            res.status(200).send(opcionesGeneradas)
    
    
    
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: -1, message: 'Se produjo error interno' })
        }
}
    



module.exports = {
    listado,
    get_branch_by_id,
    delete_branch,
    add_sucursal,
    modify_sucursal,
    select_sucursal_by_libro,
    selectSucursales
 };