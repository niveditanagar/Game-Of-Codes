var db = require("../models");

module.exports = function(app) {

  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    db.User.findAll({}).then(function(dbUser){
      res.render("index");
    });

  });

  app.get("/home/:Email", function(req, res){
    db.User.findOne({where: {Email: req.params.Email}, include: [db.PostContent], order: [[db.PostContent, "createdAt", 'DESC']] }).then(function(dbUser){
      res.render("home", {email: dbUser.Email, content: dbUser.PostContents});
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
