const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var imdb = require('./server/routes/imdb');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '250kb', extended: true}))
app.use(bodyParser.urlencoded({limit: '250kb', extended: true}))
app.use('/api', imdb);


app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () =>{
   console.log("Server listen at " + port + " port");
});
