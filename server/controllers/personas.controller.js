var config = require('../helpers/config');

//GET
module.exports.personasAleatorias = (req,res,next) =>{
  let sql= `select persona.idPersona,persona.nombre,persona.imagenPersona,persona.fechaNacimiento from persona join personapelicula p on persona.idPersona = p.Persona_idPersona inner join actores a on p.idPersonaPelicula = a.PersonaPelicula_idPersonaPelicula and a.star!=0 ORDER BY RAND()
  LIMIT 10;`;
  config.query(sql, (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

module.exports.estrellasPeli = (req,res,next) =>{
  let sql='select idPersona, nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join actores a on p.idPersonaPelicula = a.PersonaPelicula_idPersonaPelicula where idPelicula = ? and a.star=1' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });

}

module.exports.directoresPeli = (req,res,next) =>{
  let sql='select idPersona, nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join director d on p.idPersonaPelicula = d.PersonaPelicula_idPersonaPelicula where idPelicula=?' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.escritoresPeli = (req,res,next) =>{
  let sql='select idPersona, nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join escritor e on p.idPersonaPelicula = e.PersonaPelicula_idPersonaPelicula where idPelicula =?' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
}

module.exports.actoresPeli = (req,res,next) =>{
  let sql='select idPersona, nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join actores a on p.idPersonaPelicula = a.PersonaPelicula_idPersonaPelicula where idPelicula = ?' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
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
