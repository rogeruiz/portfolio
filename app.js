var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/portfolio');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

function createSchema (obj) {
  return new Schema(obj);
}

function createDocument (model, obj, cb) {
  model.create(obj, cb);
}

function getDocument (model, obj, cb) {
  model.find(obj).exec(cb);
}

db.on('open', function connected_to_db () {

  var heroSchema = createSchema({
    type: String,
    name: {
      url: String,
      text: String
    },
    role: {
      url: String,
      text: String
    },
    place: {
      url: String,
      text: String
    }
  });

  var projectSchema = createSchema({
    category: String,
    active: Boolean,
    url: String,
    name: String,
    thumbnail: String,
    description: String,
    pens: [
      {
        url: String,
        title: String,
        description: String
      }
    ],
    quotes: [String]
  });

  var Hero = mongoose.model('Hero', heroSchema);

  var Project = mongoose.model('Project', projectSchema);

  createDocument(Hero, {
    type: 'self',
    name: {
      url: "mailto:hi@rog.gr",
      text: "Roger Steve Ruiz"
    },
    role: {
      url: "/#/about",
      text: "senior technologist"
    },
    place: {
      url: "http://rokkan.com",
      text: "Rokkan"
    }
  }, function (err, hero) {
    if (err) {
      console.log('error =>', err);
    }
  });

  createDocument(Hero, {
    type: 'github',
    name: {
      url: "https://github.com/rogeruiz",
      text: "@rogeruiz"
    },
    role: {
      url: "https://github.com/rogeruiz?tab=repositories",
      text: "regular contributor"
    },
    place: {
      url: "https://github.com/",
      text: "Github"
    }
  }, function (err, hero) {
    if (err) {
      console.log('error =>', err);
    }
  });

});



// app.get('/', function (req, res) {
//   res.send('Hello World');
// });

// app.listen(3000);
// console.log('Listening on port 3000');