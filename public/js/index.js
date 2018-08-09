// Sign Up Button

$(".Sign-up").on("click", function(event) {
  var newUser = {
    Email: $(".email-input")
      .val()
      .trim(),
    Password: $(".password-input")
      .val()
      .trim()
  };

  localStorage.setItem("Email", newUser.Email);

  event.preventDefault();
  console.log(newUser);

  $.post("api/users", newUser, function(data) {
    console.log(data);
    location.replace("/home/" + newUser.Email);
  });
});

// Login Button

$(".Login").on("click", function(event) {

  var getUser = {
    Email: $(".email-input").val().trim(),
    Password: $(".password-input").val().trim()
  };

  localStorage.setItem("Email", getUser.Email);

  event.preventDefault();
  console.log(getUser);


  $.post("/login", getUser, function(data, statusTest, jqXHR) {
    console.log(data);

    if(statusTest === "success"){
      location.replace("/home/" + getUser.Email);
    } else if(statusTest === "error"){
      alert("Error: " + jqXHR.status + ":" + jqXHR.statusText);
    }
  });

  $.ajax({url: "/home/" + getEmail, method: "GET"}).then(function(response){
    console.log(response);
    location.replace("/home/" + getEmail);
  });
  
});
