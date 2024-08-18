const express=require('express')
const router=express.Router()//Sirve para declarar rutas



router.get('/', (req, res) => {
    try {
        res.render('pages/index')
    } catch (error) {
        console.log(error)
    }

})


router.get('/registrarse', (req, res) => {
    try {
        res.render('pages/registrarse')
    } catch (error) {
        console.log(error)
    }

})

router.get('/login', (req, res) => {
    try {
        res.render('pages/login')
    } catch (error) {
        console.log(error)
    }

})


router.get('/services', (req, res) => {
    try {
        res.render('pages/services')
    } catch (error) {
        console.log(error)
    }

})


router.get('/administracion_usuarios', (req, res) => {
    try {
        res.render('pages/administracion_usuarios')
    } catch (error) {
        console.log(error)
    }

})


router.get('/administracion_libros', (req, res) => {
    try {
        res.render('pages/administracion_libros')
    } catch (error) {
        console.log(error)
    }

})


router.get('/administracion_categorias', (req, res) => {
    try {
        res.render('pages/administracion_categorias')
    } catch (error) {
        console.log(error)
    }
})


router.get('/administracion_categorias_subcategorias', (req, res) => {
    try {
        res.render('pages/administracion_categorias_subcategorias')
    } catch (error) {
        console.log(error)
    }
})


router.get('/administracion_sucursales', (req, res) => {
    try {
        res.render('pages/administracion_sucursales')
    } catch (error) {
        console.log(error)
    }

})


router.get('/administracion_stock', (req, res) => {
    try {
        res.render('pages/administracion_stock')
    } catch (error) {
        console.log(error)
    }

})


router.get('/administracion_subcategorias', (req, res) => {
    try {
        res.render('pages/administracion_subcategorias')
    } catch (error) {
        console.log(error)
    }

})

router.get('/catalogo', (req, res) => {
    try {
        res.render('pages/catalogo')
    } catch (error) {
        console.log(error)
    }

})








module.exports = (app)=>{
    app.use('/',router);
};
