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

module.exports.usuario_save=(req, res, next) => {
  var data = req.body;
  let sql = 'CALL crearUsuario(?,?,?,?)';
  config.query(sql, data, (error, results, fields) => {
    if(error){
      res.send(error);
    }
    res.json(results);
  });
};
