//var mysql = requiere('mysql');
var config = require('../helpers/config');
//var conexion = mysql.createConnection(config);

//GET
module.exports.usuarios_list = (req, res, next) => {
  let sql = `SELECT * FROM usuario`;
  config.query(sql, (error, results, fields) =>{
      if(error){
        res.send(error);
      }
      res.json(results);
  });
};

//POST
module.exports.usuario_save=(req, res, next) => {
  var data = req.body;
  let sql = 'CALL crearUsuario(?,?,?,?)';
  config.query(sql, [data.nombre, data.email, data.username, data.password], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};

//POST
module.exports.usuario_login=(req, res, next) => {
  var data = req.body;
  let sql = 'CALL USER_EXISTS(?,?)';
  config.query(sql, [data.username, data.password], (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};
