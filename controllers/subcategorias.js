const caso_listado = require("../cases/subcategorias/listado.js")




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

module.exports = {
    listado
}