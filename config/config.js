let config = {
    "user": 'sa',
    "password": 'elu1234',
    "server": 'localhost',
    "database": 'BIBLIOTECA',
    "port": 1433, //Puerto de sql por defecto
    "dialect": "mssql",
    "options": {
        "encrypt": false
    },
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
    }
};

module.exports= {config} //lo exporto para poder usarlo en cualquier archivo 

// Archivo con datos necesarios para conectarme a la base 