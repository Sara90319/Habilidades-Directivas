//Incluye el modulo mysql2 para conextar a la base de datos
const mysql = require('mysql2');


//Configuracion de los parametros para la conexion
//Los valores se encuentran en el archivo .env
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Prueba de conexion a la base de datos.
connection.connect(function (error){
    if(error){
        console.error(error);
        return;
    }
    else{
        console.log('Conexion Correcta');
    }
});

//Se exporta el modulo connection para usar en otros archivos
module.exports = connection;