var config = require('../helpers/config');

//GET
module.exports.peliculasList = (req, res, next) =>{
  let sql ='select idPelicula, titulo, imagenPortada, IFNULL(AVG(calificacion),-1) as calificacionAvg from calificacion right outer join pelicula p on calificacion.Pelicula_idPelicula =p.idPelicula group by p.idPelicula order by calificacionAvg desc;'

  config.query(sql, (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

module.exports.peliculasByGenero = (req,res,next)=>{
  let sql= `select p.idPelicula, p.titulo,
  p.imagenPortada,IFNULL( AVG(c.calificacion),-1 ) from pelicula p left outer join calificacion c on c.Pelicula_idPelicula = p.idPelicula
  inner join peliculagenero p2 on p.idPelicula = p2.Pelicula_idPelicula
  inner join genero g on p2.Genero_idGenero = g.idGenero and g.tipoGenero=? GROUP BY p.idPelicula`;

  var genero= req.params.genero;
  config.query(sql,[genero], (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

module.exports.peliculasByClasificacion = (req,res,next) => {
  let sql= `select idPelicula, titulo, imagenPortada, IFNULL(AVG(calificacion), -1) as calificacionAvg from
  pelicula p left outer join calificacion on  p.idPelicula = calificacion.Pelicula_idPelicula
join clasificacion c on p.Clasificacion_idClasificacion = c.idClasificacion where c.tipoClasificacion = ? group by p.idPelicula`;
  config.query(sql, [req.params.clasi], (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

module.exports.peliculasByCalificacion = (req,res,next) => {
  let sql= `select idPelicula, titulo, imagenPortada, IFNULL(AVG(calificacion),-1) as
  calificacionAvg from calificacion right outer join pelicula p on calificacion.Pelicula_idPelicula = p.idPelicula group by  p.idPelicula order by calificacionAvg desc;`;
  config.query(sql,(error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

module.exports.peliculaById = (req,res,next) =>{
  let= sql = `select idPelicula, titulo, duracion,
  fechaEmision, sinopsis, linkTrailer,
  imagenPortada, nombrePais,
  tipoClasificacion, tipo,
  IFNULL(AVG(calificacion),-1) as calificacionAvg
  from calificacion join pelicula p on
  calificacion.Pelicula_idPelicula =
  p.idPelicula join clasificacion c on
  p.Clasificacion_idClasificacion =
  c.idClasificacion join pais p2 on
  p.Pais_idPais = p2.idPais join
  tipomaterial t on
  p.TipoMaterial_idTipoMaterial =
  t.idTipoMaterial where
  idPelicula=?;`
  config.query(sql, [req.params.id], (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

module.exports.generoByPeliId = (req,res,next) =>{
  let sql= `select tipoGenero from genero join
  peliculagenero p on
  genero.idGenero =
  p.Genero_idGenero join pelicula p2
  on p.Pelicula_idPelicula =
  p2.idPelicula where idPelicula=?;`
  config.query(sql, [req.params.id], (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

//Sacar calificaciones de una pelicula con idPelicula
module.exports.calificacionesPelicula = (req,res,next) =>{
  let sql= 'select nombre, calificacion, fechaCalif, subtitulo, comentario from calificacion join usuario u on calificacion.Usuario_idUsuario = u.idUsuario join pelicula p on calificacion.Pelicula_idPelicula = p.idPelicula where idPelicula=?';
  config.query(sql,[req.params.idPelicula],(error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}


//POST



//Agrega en la tabla pelicula
module.exports.pelicula_save = (req, res, next) => {
  var pelicula= req.body;
  let sql = `call insertPelicula(?,?,?,?,?,?,?,?,?)`;
  config.query(sql, [pelicula.titulo, pelicula.duracion, pelicula.fechaEmision, pelicula.sinopsis, pelicula.linkTrailer, pelicula.imagenPortada, pelicula.idClasificacion, pelicula.idPais, pelicula.idTipoMaterial] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}

//Insert para los generos de la película, ciclar en front
module.exports.peliculaGenero_save = (req, res, next) => {
  var peliculaGenero = req.body;
  let sql = `call insertPeliculaGenero(?,?)`;
  config.query(sql, [peliculaGenero.idPelicula, peliculaGenero.idGenero] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}

module.exports.calificacion_save = (req, res, next) => {
  var calif = req.body;
  let sql= 'insert into calificacion (calificacion, fechaCalif, subtitulo, comentario, Pelicula_idPelicula, Usuario_idUsuario) VALUES (?, CURDATE(),? ,?  ,? ,?)';
  config.query(sql, [calif.calificacion, calif.subtitulo, calif.comentario, calif.idPelicula, calif.idUsuario] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}

/*
module.exports.office_update = (req, res, next) => {
  var office = req.body;
  let sql = `UPDATE offices SET city = ?, postcode = ? WHERE officeCode = ?`;
  conexion.query(sql, [office.city, office.postcode, office.officeCode], (error, results, fields) => {
      if(error){
          res.send(error);
      } res.json(results);
  });
}

module.exports.office_delete = function(req, res, next){
  let sql = `DELETE FROM offices WHERE officeCode = ?`;
  conexion.query(sql, [req.params.officeCode], (error, results, fields) => {
      if(error){
          res.send(error);
      }
      res.json(results);
  });
} */
