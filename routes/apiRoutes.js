var db = require("../models");
var log = console.log;


module.exports = function(app) {

    app.get("/home/:Email/api/content", function(req, res){
    db.postContent.findAll({ include: [{model: db.User, required: true}] }).then(function(dbUserContent){
      console.log(dbUserContent);
      res.json(dbUserContent);
    });
  });

  app.post("/login", function(req, res){
    var body = req.body;
    console.log(body);

    db.User.findOne({where: {Email: body.Email}}).then(function(dbUser){
      if(!dbUser){
        res.status(404).end();
      }
      if(body.Password != dbUser.Password){
        res.status(403).end();
      }
      res.status(200).end();
    });

  });

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
    db.PostContent.create({
      content: body.content,
      UserEmail: req.params.Email
    }).then(function(dbpostContent){
      res.json(dbpostContent);
    })
  });

};
