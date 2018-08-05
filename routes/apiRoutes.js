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

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
