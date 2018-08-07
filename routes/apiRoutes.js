var db = require("../models");
var log = console.log;
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      log("What is dbExamples:", dbExamples);
      res.json(dbExamples);
    });
  });

  // app.get("/home/:Email", function(req, res){
  //   var email = req.params.Email;
  //   console.log("Email", email);
  //   db.User.findOne({ where: { Email: email } }).then(function(dbUsers){
  //     res.json(dbUsers);
  //   });
  // });

    app.get("/home/:Email/api/content", function(req, res){
    db.postContent.findAll({ include: [{model: db.User, required: true}] }).then(function(dbUserContent){
      console.log(dbUserContent);
      res.json(dbUserContent);
    });
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  app.post("/api/users", function(req, res) {
    var body = req.body;
    console.log("body", body);
    db.User.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/home/:Email/api/content", function(req, res){
    var body = req.body;
    console.log("body", body);
    db.postContent.create({
      Content: body.Content,
      UserEmail: req.params.Email
    }).then(function(dbpostContent){
      res.json(dbpostContent);
    })
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
