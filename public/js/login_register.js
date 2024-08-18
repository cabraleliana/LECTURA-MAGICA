const logIn = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let mensajeError = document.getElementById('mensajeError');

    try {
        const url = `http://localhost:3090/verify_login?email=${email}&password=${password}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("este es el resultado de data", data);

    if (data.status === 1) {
        localStorage.setItem("id_user", data.id);
        location.href = '/';
    } else {
        mensajeError.innerText = data.message;
    }
    } catch (error) {
        console.log(error);
    }
}





const checkUserLoginStatus = () => {
console.log('Verificando estado de login...');
if (!localStorage.getItem("id_user") && window.location.pathname !== '/login') { //la solucion fue que aca solo entra al if 
    // si no hay un atributo iduser y si no esta en la pagina de login , por eso antes se ejecutaba siempre estando como if anidado
    console.log('Usuario no logueado, redirigiendo al login...');
    location.href = '/login';
}
};

// Verifica el estado de login una vez al cargar la página
checkUserLoginStatus();

// Escucha cambios en el localStorage
window.addEventListener('storage', (event) => {
console.log('Evento de almacenamiento detectado:', event);
if (event.key === 'id_user' && !event.newValue) {
    console.log('id_user eliminado, redirigiendo al login...');
    if (window.location.pathname !== '/login') {
        location.href = '/login';
    }
}
})



const register = async () => {



    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    // por si se olvida clave  , mandar mail , o cuando se registra mando mail.
    let password = document.getElementById('password').value
    let confirm_password = document.getElementById('confirm-password').value
    let message_error = document.getElementById('mensaje-error');
    
    //nos sirve para capturar errores no controlados , como por ejemplo , una variable mal declarada , leer variable que no exista etc.
    //si no estaria , ejecuta el codigo igual pero rompe la aplicacion , puede morir servidor , que nadie se podria conectar , 
    //habria que reiniciar servidor , evitamos reinciar servidor todo el tiempo.
    //El servidor es un ambiente donde esta alojada la aplicacion. Puede haber servidor local como en mi caso y un servidor publico
    //donde se puede conectar mas gente.
    try {


            const url = 'http://localhost:3090/register';
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name,email,password}) // Convert the data object to a JSON string
            };
    
            const response= await fetch(url, options) //el fetch devuelve un status (200/500)
            console.log("RESPONSE", response)
            const data = await response.json();
            console.log("DATA", data)
            
            if (data.status == 1) {
                message_error.innerText = data.message;
            } else if (data.status == 2) {
                console.log("Redireccionando al índice...");
                location.href = '/';
            } else {
                message_error.innerText = "Unexpected response status: " + data.status;
            }
    




       

    } catch (error) {
        console.error('Error:', error);
    }



}
    
