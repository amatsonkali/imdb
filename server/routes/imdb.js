var express = require('express');
var router = express.Router();

var usuariosController = require('../controllers/usuarios.controller');
var peliculasController = require('../controllers/peliculas.controller');
var personasController = require('../controllers/personas.controller');


//Funciona como un front controller
/*
router.get('/cars', carController.cars_list);
router.get('/cars/:id', carController.car);
router.put('/cars', carController.car_update);
router.post('/cars', carController.car_save);
router.delete('/cars/:id', carController.car_delete);
*/


//Usuarios
router.get('/usuarios', usuariosController.usuarios_list);
router.post('/usuarios', usuariosController.usuario_save);
router.post('/usuarios/login', usuariosController.usuario_login);


//Peliculas
router.get('/peliculas', peliculasController.peliculasList);
router.get('/peliculas/peliculasGenero/:genero', peliculasController.peliculasByGenero);
router.get('/peliculas/peliculasClasificacion/:clasi', peliculasController.peliculasByClasificacion);
router.get('/peliculas/pelicula/:id',peliculasController.peliculaById);
router.get('/peliculas/genero/:id',peliculasController.generoByPeliId);
router.post('/peliculas/pelicula', peliculasController.pelicula_save);
router.post('/peliculas/peliculaGenero', peliculasController.peliculaGenero_save);
router.post('/peliculas/calificacion', peliculasController.calificacion_save);

//Personas
router.get('/personas/aleatorio', personasController.personasAleatorias);
router.get('/personas/estrellas/:idPelicula', personasController.estrellasPeli);
router.get('/personas/actores/:idPelicula', personasController.actoresPeli);
router.get('/personas/directores/:idPelicula', personasController.directoresPeli);
router.get('/personas/escritores/:idPelicula', personasController.escritoresPeli);



module.exports = router;
