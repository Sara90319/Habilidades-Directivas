// Modulo para crear web tokens
const jwt = require('jsonwebtoken');

// Genera un token de acceso, dicho token contiene username y rol del usuario
// El token generado solo dura 30 minutos
function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET, {expiresIn: '30m'});
}

// Valida el token recibido, si es un token valido permite la ejecucion de la siguiente funcion
// de lo contrario niega el acceso
function validateToken(req, res, next){
    const accsessToken = req.headers['authorization'];
    if(!accsessToken) console.log('token Vacio');
    
    jwt.verify(accsessToken, process.env.SECRET, (error, user)=>{
        if(error){
            console.log('Acces denided, token expired or incorrect')
        }
        else{
            next();
        }
    });
}

// Valida que el token recibido pertenezca a un administrador, 
// si es un token valido permite la ejecucion de la siguiente funcion
// de lo contrario niega el acceso
function validateTokenAdmin(req, res, next){
    const accsessToken = req.headers['authorization'];
    if(!accsessToken) console.log('token Vacio');
    
    jwt.verify(accsessToken, process.env.SECRET, (error, user)=>{
        if(error){
            console.log('Acces denided, token expired or incorrect')
        }
        else if(jwt.decode(accsessToken).rol == 'Admin'){
            next();
        }
        else{
            console.log('Access denided')
        }
    });
}


// Exporta las funciones para validar y generar tokens
module.exports = {generateAccessToken, validateToken, validateTokenAdmin};