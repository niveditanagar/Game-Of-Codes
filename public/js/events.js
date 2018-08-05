$(document).ready(function() {
  var log = console.log;
  //New User Sign up
  $("#submit-new-user").on("click", function(event) {
    event.preventDefault();
    var newUserPasswordOne = $("#password-new-user-one").val();
    var newUserPasswordTwo = $("#password-new-user-two").val();
    var newUserEmail = $("#user-email-new-user")
      .val()
      .trim();
    //Checking if a valid email inputted and if passwords match
    if (
      newUserEmail.indexOf("@") >= 0 &&
      newUserPasswordOne === newUserPasswordTwo
    ) {
      alert("valid email and password inputted");
      //log the password - remove this log
      log("New User Email: ", newUserEmail);
      log("new user passwords match!");
      log(password);
      var password = newUserPasswordTwo;
      $("#password-new-user-one").val("");
      $("#password-new-user-two").val("");
      $("#user-email-new-user").val("");
    } else {
      alert("not a valid email");
    }
  });
  //Existing user login
  $("#submit-existing-user").on("click", function(event) {
    event.preventDefault();
    var userEmail = $("#user-email-existing")
      .val()
      .trim();
    var existingPassword = $("#password-existing");
    // log(existingPassword.length);
    if (userEmail.indexOf("@") >= 0) {
      alert("valid email inputted");
      log("Existing User Email: ", userEmail);
      var userEmail = $("#user-email-existing").val("");
    } else {
      alert("not a valid email");
    }
  });
});
