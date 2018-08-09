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
    location.reload();
  });
});

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
    // location.replace("home/" + getUser.Email);
    //location.replace("/login");
  });


  // $.get("/home/:Email", getEmail, function(data){
  //   console.log(data);
  //   location.replace("/home");
  // });


  $.ajax({url: "/home/" + getEmail, method: "GET"}).then(function(response){
    console.log(response);
    location.replace("/home/" + getEmail);
  });

  $.ajax({url: "/home/" + getPassword, method: "GET"}).then(function(response){
    console.log(response);
    location.replace("/home/" + getPassword);
  });
  // $.get("/:Email/home", function(data) {});

  // $.ajax({url: "/home/" + getEmail, method: "GET"}).then(function(response){
  //   console.log(response);

  //   // location.replace()
  // });

 



});

// $(document).ready(function(){
//   var scrollTop = 0;
//   $(window).scroll(function(){
//     scrollTop = $(window).scrollTop();
//      $('.counter').html(scrollTop);
    
//     if (scrollTop >= 100) {
//       $('#global-nav').addClass('scrolled-nav');
//     } else if (scrollTop < 100) {
//       $('#global-nav').removeClass('scrolled-nav');
//     } 
    
//   }); 
  
// });

// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
