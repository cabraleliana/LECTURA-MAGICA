//CONFIGURO EL SERVIDOR

const express = require('express')
// Esta línea importa el módulo express, que es un framework web para Node.js. Te permite crear aplicaciones web y APIs de manera sencilla.
const app = express() //Instancia para levantar servidor
// Aquí se crea una instancia de Express llamada app. Esta instancia representa tu aplicación web y se utiliza para configurar rutas, middleware y otros ajustes de la aplicación. 
//esta variable almacena la clase express.

const routes_master = require('./routes/index') //LLamo a index porque ahi tengo todas las rutas
// Se importa el archivo index.js desde la carpeta routes. Este archivo contiene todas las rutas de la aplicación. La función routes_master se encargará de registrar las rutas en tu instancia de Express (app).
const cors = require('cors');
// Se importa el módulo cors, que es un middleware para habilitar CORS (Cross-Origin Resource Sharing) en tu aplicación. CORS permite que tu aplicación sea accesible desde otros dominios


app.use(cors());//Esta línea aplica el middleware cors a la aplicación, permitiendo solicitudes desde otros dominios.
app.use(express.json())//Aplica un middleware que analiza las solicitudes entrantes con contenido JSON y las convierte en un objeto JavaScript accesible en req.body
app.use(express.urlencoded({ extended: true }));
// Aplica un middleware que analiza las solicitudes entrantes con datos codificados en la URL (por ejemplo, datos enviados mediante formularios) y las convierte en un objeto JavaScript accesible en req.body. El parámetro extended: true permite analizar datos más complejos, como objetos anidados.
app.set('view engine', 'ejs')
// Configura EJS (Embedded JavaScript) como el motor de plantillas de tu aplicación. Esto permite renderizar vistas dinámicas usando archivos .ejs.
app.use(express.static('public'))
// Configura una carpeta llamada public como directorio estático. Esto significa que todos los archivos en esa carpeta serán servidos directamente por el servidor sin necesidad de definir rutas específicas para ellos. Por ejemplo, si tienes un archivo public/style.css, podrás acceder a él mediante http://localhost:3080/style.css




routes_master(app) //Lo pongo aca,donde se ejecuta para que app reconozca las rutas del index , app es el servidor que levantamos , lo mandamos por parametrom para poder agregarle rutas desde otro archivo

// Llama a la función routes_master pasando la instancia app. Esto permite que las rutas definidas en routes/index.js se registren en la instancia de Express, haciendo que la aplicación reconozca estas rutas.

//en routes master almaceno la funcion que se exporto desde ese archivo y la ejecuto aca mandandole app que instancia express. aca es donde al servidor le empiezo a agregar rutas 



let port = 3090 //Define el puerto en el que tu aplicación escuchará las solicitudes entrantes. 

app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`)
})
