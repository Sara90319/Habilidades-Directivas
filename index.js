const express = require('express');
const app = express();

//Configuracion del puerto del servidor
app.set('port', process.env.PORT || 3000);

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Rutas para las peticiones http
app.use(require('./src/rutas'));

//Iniciar servidor
app.listen(app.get('port'),()=>{
    console.log(`Servidor en puerto ${app.get('port')}`);
});