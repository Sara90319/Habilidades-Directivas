//Incluye el modulo express
const express = require('express');
const router = express.Router();


//Modulo encargado de realizar las acciones correspondientes segun la solicitud realizada
const acciones = require('./acciones');
//Modulo que valida la identidad de un usuario o administrador.
const authentication = require('./authentication');

router.get("/", function(req, res){
    res.render("principal");
});    

//Consulta todas las peliculas disponibles en la base de datos
//La consulta solo se puede realizar si el usuario ha iniciado sesion
router.get('/movies',authentication.validateToken, acciones.get_movies);

//Consulta informacion de una sola pelicula mediante su ID
//La consulta solo se puede realizar si el usuario ha iniciado sesion
router.get('/movies/id/:id',authentication.validateToken, acciones.get_movie_id);

//Consulta informacion de peliculas por nombre de la pelicula
//La consulta solo se puede realizar si el usuario ha iniciado sesion
router.get('/movies/name/:name',authentication.validateToken, acciones.get_movie_name);

//Consulta informacion de todos los actres disponibles en la base de datos
//La consulta solo se puede realizar si el usuario ha iniciado sesion
router.get('/actor', authentication.validateToken, acciones.get_actor);

//Consulta informacion de un actor por su ID
//La consulta solo se puede realizar si el usuario ha iniciado sesion
router.get('/actor/id/:id', authentication.validateToken, acciones.get_actor_id);

//Consulta informacion de actores por su nombre
//La consulta solo se puede realizar si el usuario ha iniciado sesion
router.get('/actor/name/:name', authentication.validateToken, acciones.get_actor_name);


//Inicio de sesion de un ausuario
router.post('/auth/user', acciones.login);
//Inicio de sesion de un administrador
router.post('/auth/admin', acciones.loginAdmin);


//Permite que un usuario pueda calificar una pelicula
//La consulta solo se puede realizar si el usuario ha iniciado sesion
router.post('/movie/rate', authentication.validateToken, acciones.rate_movie);

//Permite que un administrador pueda modificar el titulo de una pelicula mediante el ID de la pelicula
//El cambio solo se puede realizar si el usuario que inicio sesion es un administrador
router.post('/alter/title/movie', authentication.validateTokenAdmin, acciones.alter_movie_title);

//Permite que un administrador pueda modificar la fecha de una pelicula mediante el ID de la pelicula
//El cambio solo se puede realizar si el usuario que inicio sesion es un administrador
router.post('/alter/date/movie/:id',authentication.validateTokenAdmin, acciones.alter_movie_date);

//Permite que un administrador pueda modificar la imagen de una pelicula mediante el ID de la pelicula
//El cambio solo se puede realizar si el usuario que inicio sesion es un administrador
router.post('/alter/img/movie/:id',authentication.validateTokenAdmin, acciones.alter_movie_img);

//Permite que un administrador pueda crear una nueva pelicula
//El cambio solo se puede realizar si el usuario que inicio sesion es un administrador
router.post('/create/movie', authentication.validateTokenAdmin, acciones.create_movie);

//Permite a un administrador eliminar una pelicula mediante el id de la pelicula
//El cambio solo se puede realizar si el usuario que inicio sesion es un administrador
router.post('/delete/movie', authentication.validateTokenAdmin, acciones.delete_movie);


//Exporta el modulo que gestiona las rutas de peticiones
module.exports = router;