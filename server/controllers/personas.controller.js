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


//POST
