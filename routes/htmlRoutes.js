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
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/home/:Email", function(req, res){
    console.log(req.params.Email);
    db.User.findOne({ where: { Email: req.params.Email }, include: [db.postContent], order:[[db.postContent,"createdAt", 'DESC']] }).then(function(dbUser){
      console.log(dbUser);
      console.log("----------------------------------------------------------")
      console.log(dbUser.postContents);
      console.log("----------------------------------------------------------");
      console.log(dbUser.postContent);
      if(!dbUser){
        res.render("404");
      } else{
        res.render("home", {email: dbUser.Email, content: dbUser.postContents});
      }

      
      
    });
  });

  app.get("/home/:Email/profile", function(req, res){
    db.User.findOne({}).then(function(dbUser){
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
