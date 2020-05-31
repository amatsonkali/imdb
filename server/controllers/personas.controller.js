var config = require('../helpers/config');

//GET
module.exports.personasAleatorias = (req,res,next) =>{
  let sql= `select persona.idPersona,persona.nombre,a.nombrePapel,persona.imagenPersona,persona.miniBiografia, persona.fechaNacimiento from persona join personapelicula p on persona.idPersona = p.Persona_idPersona inner join actores a on p.idPersonaPelicula = a.PersonaPelicula_idPersonaPelicula and a.star!=0 ORDER BY RAND()
  LIMIT 10;`;
  config.query(sql, (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

module.exports.estrellasPeli = (req,res,next) =>{
  let sql='select nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join actores a on p.idPersonaPelicula = a.PersonaPelicula_idPersonaPelicula where idPelicula = ? and a.star=1' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.directoresPeli = (req,res,next) =>{
  let sql='select nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join director d on p.idPersonaPelicula = d.PersonaPelicula_idPersonaPelicula where idPelicula=?' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.escritoresPeli = (req,res,next) =>{
  let sql='select nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join escritor e on p.idPersonaPelicula = e.PersonaPelicula_idPersonaPelicula where idPelicula =?' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.actoresPeli = (req,res,next) =>{
  let sql='select idPersona, nombre, fechaNacimiento, miniBiografia, a.nombrePapel from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join actores a on p.idPersonaPelicula = a.PersonaPelicula_idPersonaPelicula where idPelicula = ? ' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.personaDetail = (req,res,next) =>{
  let sql=`select idPersona,nombre,fechaNacimiento,miniBiografia,fechaNacimiento, p.imagenPersona, p2.nombrePais
  from persona p inner join pais p2 on p.Pais_idPais = p2.idPais and p.idPersona=?;`;
  config.query(sql, [req.params.idPersona], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.personaProfesionDetail = (req,res,next) =>{
  let sql='select tipo from tipoprofesion join personatipoprofesion p on tipoprofesion.idtipoProfesion = p.tipoProfesion_idtipoProfesion join persona p2 on p.Persona_idPersona = p2.idPersona where idPersona=?';
  config.query(sql, [req.params.idPersona], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}


//catalogo de personas totales
module.exports.personasTotal = (req,res,next) =>{
  let sql= 'select idPersona, nombre from persona;';
  config.query(sql, (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

//catalogo de tipo profesión
module.exports.tipoProfesion = (req,res,next) =>{
  let sql= 'SELECT idtipoProfesion, tipo FROM tipoprofesion;';
  config.query(sql, (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.persona_save = (req, res, next)=>{
  var persona = req.body;
  let sql='call Crear_Persona(?,?,?,?,?)';
  config.query(sql, [persona.nombre, persona.fechaNacimiento, persona.miniBiografia, persona.imagenPersona, persona.idPais] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}

module.exports.personaPelicula_save = (req, res, next)=>{
  var perPeli = req.body;
  let sql='call insertPersonaPelicula(?,?)';
  config.query(sql, [perPeli.idPelicula, perPeli.idPersona] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}


module.exports.director_save = (req, res, next)=>{
  var direct = req.body;
  let sql = 'call insertDirector(?)';
  config.query(sql, [direct._idPersonaPelicula] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}

module.exports.escritor_save = (req, res, next)=>{
  var escrit = req.body;
  let sql = 'call insertEscritor(?)';
  config.query(sql, [escrit._idPersonaPelicula] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}

module.exports.actorEstrella_save = (req, res, next)=>{
  var actor = req.body;
  let sql = 'call insertActorEstrella(?,?,?)';
  config.query(sql, [actor._nombrePapel, actor._star, actor._idPersonaPelicula] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}

module.exports.personaTipoProfesion_save = (req, res, next)=>{
  var perTipoProf = req.body;
  let sql='INSERT INTO personatipoprofesion (Persona_idPersona, tipoProfesion_idtipoProfesion) VALUES (?,?);';
  config.query(sql, [perTipoProf.idPersona, perTipoProf.idtipoProfesion] , (error, results, fields) =>{
    if(error){
      res.send(error);
    }
    res.json(results)
  })
}
