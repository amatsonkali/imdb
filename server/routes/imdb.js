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


//Peliculas
router.get('/peliculas', peliculasController.peliculasList);
router.get('/peliculas/peliculasGenero', peliculasController.peliculasByGenero);
router.get('/peliculas/peliculasClasificacion', peliculasController.peliculasByClasificacion);

//Personas
router.get('/personas/aleatorio', personasController.personasAleatorias);


module.exports = router;
