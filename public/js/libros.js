const libros_destacados = async (id) => {
    
    try {
        const url = `http://localhost:3090/books/libros_destacados`;
        const response = await fetch(url);
        const data = await response.text();
        console.log(data)
        document.getElementById('contenedor_libros_destacados').innerHTML=data

    } catch (error) {
        console.log(error);
    }
}

libros_destacados()