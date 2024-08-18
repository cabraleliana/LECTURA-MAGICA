const Sql = require('../db_sql') //aca estoy recibiendo la clase entera
const config = require('../config/config').config



const verify_login = async (req, res) => {
    try {
        const query = `select * from usuarios where email='${req.query.email}' and password='${req.query.password}' and eliminado=0`
        const db = new Sql(config)
        const result = await db.ejecutar(query)

        console.log("el resultado de la consulta es" , result)

        if (result.length > 0) {

            res.status(200).json({ status: 1, message: 'Usuario correcto', id: result[0].id })

        } else {

            res.status(401).json({ status: -1, message: 'Usuario incorrecto' })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const register = async (req, res) => {
    try {
        let query = `select * from users where email='${req.body.email}' and eliminado=0`
        const db = new Sql(config)
        let result = await db.ejecutar(query)

        console.log("el resultado de la consulta es" , result)

        if (result.length > 0) {

            res.status(401).json({ status: 1, message: 'Usuario existente'})

        } else {

            query = `INSERT INTO users (name,email,password) VALUES ('${req.body.name}','${req.body.email}','${req.body.password}')`

            result = await db.ejecutar(query)


            res.status(200).json({ status: 2, message: 'Usuario registrado correctamente'})
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const get_all_users = async (req, res) => {
    try {
        const query = `select * from users where eliminado=0`
        const db = new Sql(config)
        const result = await db.ejecutar(query)

        res.status(200).json({ status: 1, data: result })


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const get_user_by_id = async (req, res) => {
    try {
        const query = `select * from users where id=${req.params.id}`
        const db = new Sql(config)
        const result = await db.ejecutar(query)

       res.render('./pages/formulario_usuarios.ejs', {data: result})


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}



const caso_delete = require("../cases/usuarios/deleteUser.js")
const caso_addUser = require("../cases/usuarios/addUser.js")
const caso_modifyUser = require("../cases/usuarios/modifyUser.js")


const delete_user = async (req, res) => {
    try {
        const result = await caso_delete(req);

        res.status(200).json({ status: 1, message: 'Usuario eliminado exitosamente', result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}

const add_user = async (req, res) => {

    try {
        let result = await caso_addUser(req)

         res.status(200).json({ status: 1, message: 'Usuario insertado exitosamente', id:result[0].id })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}


const modify_user = async (req, res) => {

    try {
        let result = await caso_modifyUser(req)

         res.status(200).json({ status: 1, message: 'Usuario modificado exitosamente'})

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: -1, message: 'Se produjo error interno' })
    }
}




module.exports = {
   verify_login,
   register,
   get_all_users,
   get_user_by_id,
   delete_user,
   add_user,
   modify_user
};