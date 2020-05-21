var express = require('express');
var router = express.Router();

var peliculasController = require('../controllers/peliculas.controller');

router.get('/peliculas', peliculasController.peliculasList);
router.get('/peliculas/peliculasGenero', peliculasController.peliculasByGenero);
router.get('/peliculas/peliculasClasificacion', peliculasController.peliculasByClasificacion);


module.exports = router;

