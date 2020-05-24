var express = require('express');
var path= require('path');
var bodyParser= require('body-parser');

var apiIMDb= require('./routes/imdb');
var apiPeliculas = require('./routes/peliculas');
var apiPersonas = require('./routes/personas');

var port= 3000;
var app = express();

app.use(express.json());
app.use('/api', apiIMDb);
app.use('/apiPelicula', apiPeliculas);
app.use('/apiPersona', apiPersonas);


app.listen(port, () => {
    console.log('Servidor iniciado en el puerto '+ port);
});
