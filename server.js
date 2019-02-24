var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var expressHbr = require("express-handlebars");

const PORT = process.env.PORT || 8080;

var app = express();


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

//require the routes 
// require("./routes/htmlRoute")(router);
// starting the server
app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
  });
  
  
  