var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("colorGame");
});

app.listen(process.env.PORT, process.env.IP);
