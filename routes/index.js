const pages=require('./pages')//llamo las paginas que se renderizan
const login_register=require('./login_register')
const users=require('./users')
const books=require('./books')
const categories=require('./categories')
const sucursales=require('./sucursales')
const stock=require('./stock')
const subcategories=require('./subcategorias')




module.exports = (app)=>{
    pages(app)//las ejecuto y mando la variable app , que me sirve para pasarsela a todas mis rutas , lo cual sirve para que me levante las rutas
    login_register(app)
    users(app)
    books(app)
    categories(app)
    sucursales(app)
    stock(app)
    subcategories(app)

    //cuando iniciamos el servidor ejecutamos estas funciones que habilitan el uso de sus respectivas rutas
}