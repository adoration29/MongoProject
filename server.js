var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var expressHbr = require("express-handlebars");
var path = require('path');

const PORT = process.env.PORT || 8080;

var app = express();


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

//require the routes 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.get("/new", function(req, res) {
  res.send("hello World" );
});

//A GET route for scraping the hackernews website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://news.ycombinator.com/").then(function(response) {
    
    var $ = cheerio.load(response.data);

    
    $("article h2").each(function(i, element) {
      
      var result = {};

      
      result.title = $(this)
        .children("a")
        .text();
      result.summary = $(this)
        .children("a")
        .attr("href");
    
      db.Article.create(result)
        .then(function(dbArticle) {
          
          console.log(dbArticle);
        })
        .catch(function(err) {
        
          console.log(err);
        });
    });

    res.send("Scrape Complete");
  });
});


app.get("/articles", function(req, res) {
  
  db.Article.find({})
    .then(function(dbArticle) {
      
      res.json(dbArticle);
    })
    .catch(function(err) {
    
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
    
      res.json(dbArticle);
    })
    .catch(function(err) {
    
      res.json(err);
    });
});

// starting the server
app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
  });
  
  
  