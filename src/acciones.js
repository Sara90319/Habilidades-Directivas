//Modulo que conecta con la base de datos 
const connection = require('./conexion');
//Modulo que valida usuarios, administradores y genera tokens de acceso
const authentication = require('./authentication');


/*
*** Consulta todas las peliculas disponibles en la base de datos
*** y las devuelve en un formato json
*/
module.exports.get_movies = (req, res) =>{
    connection.query('SELECT * FROM pelicula', (err, rows, fields) => {
        if(!err){
            res.json(rows);
            
        }
        else{
            console.log(err);
        }
    });
}

/*
*** Consulta una pelicula usando su ID, envia como respuesta los datos de la pelicula en formato json
*** Requiere que el id de la pelicula se envie en la URL de la peticion
*** Ejemplo: http://localhost:3000/movies/id/3
*/
module.exports.get_movie_id = (req, res) =>{
    const {id} = req.params;
    connection.query('SELECT * FROM pelicula WHERE id_pelicula = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);            
        }
        else{
            console.log(err);
        }
    });
}


/*
*** Busca una pelicula mediante el nombre o una cadena de caracteres que puede estar en el nombre
*** Devuelve los resultados de la consulta en un formato json.
*** Requiere que el nombre o la cadena de caracteres se envien por la URL
*** Ejemplo: http://localhost:3000/movies/name/titanic
*/
module.exports.get_movie_name = (req, res) =>{
    const {name} = req.params;
    connection.query("SELECT * FROM pelicula WHERE titulo LIKE '%" + name + "%'", (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    });
}


/*
*** Consulta todos los actores disponibles de la base de datos
*** devuelve el resultado de la consulta en formato json
*/
module.exports.get_actor = (req, res) =>{
    connection.query('SELECT * FROM actores', (err, rows, fields) => {
        if(!err){
            res.json(rows);
            
        }
        else{
            console.log(err);
        }
    });
}


/*
*** Consulta la informacion de un actor mediante su ID
*** devuelve el resultado de la consulta en formato json
*** Requiere que el ID del actor se envie dentro de la URL
*** Ejemplo: http://localhost:3000/actor/id/3
*/
module.exports.get_actor_id = (req, res) =>{
    const {id} = req.params;
    connection.query('SELECT * FROM actores WHERE id_actor = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);            
        }
        else{
            console.log(err);
        }
    });
}


/*
*** Consulta la informacion de un actor mediante su su nombre o una cadena de caracteres que pueden estar en su nombre
*** devuelve el resultado de la consulta en formato json
*** Requiere que el nombre del actor o la cadena de caracteres sean enviados en la URL de la peticion
*** Ejemplo: http://localhost:3000/actor/name/leo
*/
module.exports.get_actor_name = (req, res) =>{
    const {name} = req.params;
    connection.query("SELECT * FROM pactor WHERE titulo LIKE '%" + name + "%'", (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    });
}


/*
*** Inicio de sesion de un usuario normal
*** Los campos que contengan el usuario y contraseña de deben llevar los nombres usarname y password respectivamente
*** Ejemplo: 
*** <input type="text" name="username" required> 
*** <input type="password" name="password" required>
*** Con estos campos se busca en la base de datos en la tabla cliente si hay algun registro que coincida con ellos.
*** si algun registro coincide con las credenciales entonces el usuario existe y se le genera un token de autenticacion
*** el token generado se envia en una cabecera de respuesta en formato jason
*/
module.exports.login = (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;
    if(username && password){
        connection.query('SELECT * FROM cliente WHERE nombre = ? AND contraseña = ?', [username, password], function(error, results, fields){
            if(error) throw error;
            if(results.length > 0){

                const user = {username: username, rol: 'User'};

                const accessToken = authentication.generateAccessToken(user);

                res.header('authorization', accessToken).json({
                    message: 'Usuario autenticado',
                    token: accessToken
                });
            }else{
                console.log('Ususario no enconrado')
            }
        });
    }else {
        console.log('Ingresar usuario y contraseña')
    }
}


/*
*** Inicio de sesion de un usuario administrador
*** Los campos que contengan el usuario y contraseña de deben llevar los nombres usarname y password respectivamente
*** Ejemplo: 
*** <input type="text" name="username" required> 
*** <input type="password" name="password" required>
*** Con estos campos se busca en la base de datos en la tabla administrador si hay algun registro que coincida con ellos.
*** si hay algun registro que coincida con las credenciales entonces el usuario existe y se le genera un token de autenticacion
*** el token generado se envia en una cabecera de respuesta en formato jason
*/
module.exports.loginAdmin = (req, res) =>{
    let username = req.body.username;
    let password = req.body.password;
    if(username && password){
        connection.query('SELECT * FROM administrador WHERE nombre = ? AND contraseña = ?', [username, password], function(error, results, fields){
            if(error) throw error;
            if(results.length > 0){

                const user = {username: username, rol: 'Admin'};

                const accessToken = authentication.generateAccessToken(user);

                res.header('authorization', accessToken).json({
                    message: 'Usuario autenticado',
                    token: accessToken
                });
            }else{
                console.log('Ususario no enconrado')
            }
        });
    }else {
        console.log('Ingresar usuario y contraseña')
    }
}


/*
*** Pone una calificacion a una pelicula
*** 
*** 
*/
module.exports.rate_movie = (req, res) =>{
    
}


/*
*** Modifica el titulo de una pelicula por medio de su ID
*** Requiere dos campos, ID de la pelicula y el nuevo titulo. 
*** Los campos que contengan el id de la pelicula y el nuevo titulo deberan llamarse id_pelicula y new_title respectivamente
*** Ejemplo: 
*** <input type="text" name="id_pelicula" required> 
*** <input type="text" name="new_title" required>
*/
module.exports.alter_movie_title = (req, res) =>{
    const id_pelicula = req.body.id_pelicula;
    const new_title = req.body.new_title;
    connection.query('UPDATE pelicula SET titulo = ? WHERE id_pelicula = ?', [new_title, id_pelicula], function(error, result, fields){
        if(error) throw error;
        if(result.changedRows > 0){
            console.log("Cambio realizado")
        }
        else{
            console.log("Cambio no efectuado")
        }
    });

}


/*
*** Modifica la fecha de una pelicula
*** Requiere dos campos, ID de la pelicula y la nueva fecha. 
*** Los campos que contengan el id de la pelicula y la nueva fecha deberan llamarse id_pelicula y new_date respectivamente
*** Ejemplo: 
*** <input type="text" name="id_pelicula" required> 
*** <input type="text" name="new_date" required>
*** el formato de la fecha debe de ser: AAAA-MM-DD
*/
module.exports.alter_movie_date = (req, res) =>{
    const id_pelicula = req.body.id_pelicula;
    const new_date = req.body.new_date;
    connection.query('UPDATE pelicula SET fecha = ? WHERE id_pelicula = ?', [new_date, id_pelicula], function(error, result, fields){
        if(error) throw error;
        if(result.changedRows > 0){
            console.log("Cambio realizado")
        }
        else{
            console.log("Cambio no efectuado")
        }
    });
}


/*
*** Modifica la URL que contiene la imagen de la pelicula
*** Requiere dos campos, ID de la pelicula y la nueva URL. 
*** Los campos que contengan el id de la pelicula y la nueva imagen deberan llamarse id_pelicula y new_img respectivamente
*** Ejemplo: 
*** <input type="text" name="id_pelicula" required> 
*** <input type="text" name="new_img" required>
*/
module.exports.alter_movie_img = (req, res) =>{
    const id_pelicula = req.body.id_pelicula;
    const new_img = req.body.new_img;
    connection.query('UPDATE pelicula SET imagen = ? WHERE id_pelicula = ?', [new_img, id_pelicula], function(error, result, fields){
        if(error) throw error;
        if(result.changedRows > 0){
            console.log("Cambio realizado")
        }
        else{
            console.log("Cambio no efectuado")
        }
    });
}


/*
*** Agrega una nueva pelicula a la base de datos
*** Requiere seis campos, id del cliente, id del administrador, titulo, calificacion, fecha y URL de la imagen. 
*** Los campos que contienen cada dato deberan llamarse:
*** -- id_cliete
*** -- id_administrador
*** -- titulo
*** -- calificacion
*** -- fecha
*** -- imagen
*** Ejemplo: 
*** <input type="text" name="id_cliente" required>
*** <input type="text" name="id_administrador" required>
*** <input type="text" name="titulo" required>
*** <input type="text" name="calificacion" required>
*** <input type="text" name="fecha" required>
*** <input type="text" name="imagen" required>
*** el formato de la fecha debe de ser: AAAA-MM-DD
*/
module.exports.create_movie = (req, res) =>{
    const id_cliente = req.body.id_cliente;
    const id_administrador = req.body.id_administrador;
    const titulo = req.body.titulo;
    const calificacion = req.body.calificacion;
    const fecha = req.body.fecha;
    const imagen = req.body.imagen;
    
    connection.query('INSERT INTO pelicula (id_cliente, id_administrador, titulo, calificacion, fecha, imagen) VALUES (?, ?, ?, ?, ?, ?)', [id_cliente, id_administrador, titulo, calificacion, fecha, imagen], function(error, result, fields){
        if(error) throw error;
        if(result.affectedRows > 0){
            console.log("Pelicula creada")
        }
        else{
            console.log("No se pudo crear")
        }
    });
}


/* 
*** Elimina una pelicula de la base de datos
*** Requiere el id de la pelicula que se quiere eliminar, el ID debe llamarse id_pelicula
*** Ejemplo: 
*** <input type="text" name="id_pelicula" required>
*/
module.exports.delete_movie = (req, res) =>{
    const id_pelicula = req.body.id_pelicula;
    
    connection.query('DELETE FROM pelicula WHERE id_pelicula = ?', id_pelicula, function(error, result, fields){
        if(error) throw error;
        if(result.affectedRows > 0){
            console.log("Pelicula eliminada")
        }
        else{
            console.log("No se pudo eliminar")
        }
    });
}