var express = require('express');
var router = express.Router();

var usuariosController = require('../controllers/usuarios.controller');

//Funciona como un front controller
/*
router.get('/cars', carController.cars_list);
router.get('/cars/:id', carController.car);
router.put('/cars', carController.car_update);
router.post('/cars', carController.car_save);
router.delete('/cars/:id', carController.car_delete);
*/
router.get('/usuarios', usuariosController.usuarios_list);

module.exports = router;