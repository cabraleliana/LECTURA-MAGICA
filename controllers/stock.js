const caso_listado = require("../cases/stock/listado.js")
const caso_buscarStock = require("../cases/stock/buscarStock.js")
const caso_addStock = require("../cases/stock/addStock.js")




const listado = async (req, res) => {
    try {
        let result = await caso_listado(req);
        res.status(200).json({ status: 1, data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}


const buscarStock = async (req, res) => {
    try {
        
       let result = await caso_buscarStock(req);

       res.render('./pages/formulario_stock.ejs', {data: result})


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}


const add_stock = async (req, res) => {
    try {
        
       let result = await caso_addStock(req);

       res.status(200).json({ status: 1, message: 'Stock insertado exitosamente', id:result[0].id })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

module.exports = {
    listado,
    buscarStock,
    add_stock
 };