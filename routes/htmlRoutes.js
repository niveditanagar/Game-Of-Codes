var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  

  app.get("/home/:Email", function(req, res) {
    console.log(req.params.Email);
    console.log(req.body);
    db.User.findOne({
      where: { Email: req.params.Email },
      include: [db.PostContent],
      order: [[db.PostContent, "createdAt", "DESC"]]
    }).then(function(dbUser) {
      console.log(dbUser);
      if (!dbUser) {
        res.render("404");
      } else {
        res.render("home", { email: dbUser.Email, content: dbUser.PostContents });
      };
      })
  });

  app.get("/home/:Password", function (req, res) {
    console.log(req.params.Password);
    console.log(req.body);
    db.User.findOne({ where: { Password: req.params.Password }, include: [db.PostContent], order: [[db.PostContent, "createdAt", 'DESC']] })
      .then(function (dbUser) {
      console.log(dbUser);
      if (!dbUser) {
          res.render("404");
        } else {
          res.render("home", { Password: dbUser.Password, content: dbUser.PostContents });
        };
      })
  });

  app.get("/home/:Email/profile", function(req, res) {
    db.User.findOne({}).then(function(dbUser) {
      res.render("profile");
    });
  });

  app.get("/home/:Password/profile", function(req, res) {
    db.User.findOne({}).then(function(dbUser) {
      res.render("profile");
    });
  });

  // app.get("/home/:Email/api/content", function(req,res){
  //   db.postContent.findAll({}).then(function(data){
  //     res.render("home", { content: data } );
  //   })
  // })

  // app.get("/home/:Email", function(req, res){
  //   var email = req.params.Email;
  //   //console.log("Email", email);
  //   db.User.findOne({ where: { Email: email } }).then(function(dbUser){
  //     res.render("home", {
  //       Email: dbUser
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
