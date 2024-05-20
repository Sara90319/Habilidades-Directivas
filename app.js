const express = require('express');
const app = express();

//Configuracion del puerto del servidor
app.set('port', process.env.PORT || 3000);

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Rutas para las peticiones http
app.use(require('./src/rutas'));

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//Iniciar servidor
app.listen(app.get('port'),()=>{
    console.log(`Servidor en puerto ${app.get('port')}`);
});