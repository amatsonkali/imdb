var config = require('../helpers/config');

module.exports.peliculasList = (req, res, next) =>{
  let sql= `select idPelicula, titulo, imagenPortada, AVG(calificacion) as calificacionAvg from calificacion join pelicula p on calificacion.Pelicula_idPelicula = p.idPelicula order by calificacionAvg desc`;
  config.query(sql, (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  })
};

module.exports.peliculasByGenero = (req,res,next)=>{
  let sql= `select idPelicula, titulo, imagenPortada, AVG(calificacion) as calificacionAvg from calificacion join pelicula p on calificacion.Pelicula_idPelicula = p.idPelicula join peliculagenero p2 on p.idPelicula = p2.Pelicula_idPelicula join genero g on p2.Genero_idGenero = g.idGenero where g.tipoGenero = ?`;
  config.query(sql, [req.params.g.tipoGenero], (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  })
}

module.exports.peliculasByClasificacion = (req,res,next) => {
  let sql= `select idPelicula, titulo, imagenPortada, AVG(calificacion) as calificacionAvg from calificacion join pelicula p on calificacion.Pelicula_idPelicula = p.idPelicula join clasificacion c on p.Clasificacion_idClasificacion = c.idClasificacion where c.tipoClasificacion = ?`;
  config.query(sql, [req.params.c.tipoClasificacion], (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  })
}
