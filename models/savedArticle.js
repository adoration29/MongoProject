var mongoose = require("mongoose");


var Schema = mongoose.Schema;


// This is similar to a Sequelize model
var savedArticleSchema = new Schema({
  
  title: String,
  
summary: String
});


var savedarticle = mongoose.model("savedArticle", SaveArticleSchema);

module.exports = savedArticle;
