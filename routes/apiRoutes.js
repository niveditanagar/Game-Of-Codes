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

  app.get("/home/:Password/api/content", function(req, res){
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

  app.post("/login", function(req, res){
    var body = req.body;
    console.log(body);

    db.User.findOne({where: {Email: body.Email}}).then(function(dbUser){
      if(!dbUser){
        res.status(404).end();
      }
      if(body.Password != dbUser.Password){
        res.status(403).end();
        console.log("Marlee is awesome");
      }
      res.status(200).end();
    });

    // bcrypt.genSalt(10, function(err, salt){
    //   bcrypt.hash(body.Password, salt, function(err, hash){
    //     body.Password = hash;
    //     console.log(body.Password);
    //     encp = body.Password;

    //     console.log("Enc", encp);
    //     // db.User.create({Email: body.Email, Password: encp}).then(function(dbUser){
    //     //   res.json(dbUser);
    //     // });

    //     db.User.findOne({where: {Email: body.Email}}).then(function(dbUser){
    //       console.log(dbUser.Password);
    //       console.log(encp);
    //       console.log(typeof dbUser.Password);
    //       console.log(typeof encp);

    //     });

    //   });
    // });

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

  app.post("/home/:Password/api/content", function(req, res){
    var body = req.body;
    console.log("body", body);
    db.postContent.create({
      Content: body.Content,
      UserPassword: req.params.Password
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
