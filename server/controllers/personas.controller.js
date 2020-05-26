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
  let sql='select nombre from persona join personapelicula p on persona.idPersona = p.Persona_idPersona join pelicula p2 on p.Pelicula_idPelicula = p2.idPelicula join actores a on p.idPersonaPelicula = a.PersonaPelicula_idPersonaPelicula where idPelicula = ?' ;
  config.query(sql, [req.params.idPelicula], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });

}



//POST
