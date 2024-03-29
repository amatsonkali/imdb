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
router.get('/peliculas/calificacionesPelicula/:idPelicula', peliculasController.calificacionesPelicula);
router.post('/peliculas/pelicula', peliculasController.pelicula_save);
router.post('/peliculas/peliculaGenero', peliculasController.peliculaGenero_save);
router.post('/peliculas/calificacion', peliculasController.calificacion_save);
router.delete('/peliculas/pelicula/:idPelicula',peliculasController.pelicula_delete);
//Personas
router.get('/personas/aleatorio', personasController.personasAleatorias);
router.get('/personas/estrellas/:idPelicula', personasController.estrellasPeli);
router.get('/personas/actores/:idPelicula', personasController.actoresPeli);
router.get('/personas/directores/:idPelicula', personasController.directoresPeli);
router.get('/personas/escritores/:idPelicula', personasController.escritoresPeli);
router.get('/personas', personasController.personasTotal);
router.get('/personas/persona/:idPersona', personasController.personaDetail);
router.get('/personas/profesion', personasController.personaProfesionDetail);
router.post('/personas', personasController.persona_save);
router.post('/personas/pelicula', personasController.personaPelicula_save);
router.post('/personas/actor', personasController.actorEstrella_save);
router.post('/personas/director', personasController.director_save);
router.post('/personas/escritor', personasController.escritor_save);


//Catalogos
router.get('/clasificaciones', peliculasController.clasificaciones);
router.get('/paises', peliculasController.paises);
router.get('/tipoMaterial', peliculasController.tipoMaterial);
router.get('/generos', peliculasController.generos);
router.get('/tipoProfesion', personasController.tipoProfesion);
router.post('/personas/tipoProfesion', personasController.personaTipoProfesion_save);

module.exports = router;
