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
    db.User.findOne({where: {Email: req.params.Email} }).then(function(dbUser){
      res.render("home", {email: dbUser.Email});
    });
  });

  app.get("/home/:Email/:Password", function(req, res){
    console.log(req.params.Email);

    console.log(req.params.Password);
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(req.params.Password, salt, function(err, hash){
        req.params.Password = hash;
        encp = req.params.Password;

        console.log("Enc", encp);
        db.User.findOne({where: { Email: req.params.Email}, $and: { Password: encp} }).then(function(dbUser){
          console.log(dbUser);
          if(!dbUser){
            res.render("404");
          } else if(!dbUser.Password){
            res.render("403");
          } else{
            res.render("home", {email: dbUser.Email});
            // res.json(dbUser);
          }




        });
      });
    });

    // db.User.findOne({ where: { Email: req.params.Email }, include: [db.PostContent], order:[[db.PostContent,"createdAt", 'DESC']] }).then(function(dbUser){
    //   console.log(dbUser);
    //   if(!dbUser){
    //     res.render("404");
    //   } else{
    //     res.render("home", {email: dbUser.Email, content: dbUser.PostContents});
    //     res.json(dbUser);

    //   }

    // });

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
