

var email = localStorage.getItem("Email");

console.log(email);

$.get("/home/" + email + "/api/content",function(data){
    console.log(data);
    location.replace("/home/" + email + "/api/content");
})

$("#view-profile").on("click", function(event){
    event.preventDefault();
    console.log("Button is working");

    $.get("/home/" + email + "/profile", function(data){
        console.log(data);
        location.replace("/home/" + email + "/profile");
    });


});

$("#submit-content").on("click", function(event){
    event.preventDefault();
    var newPost = {
        Content: $("#post-content").val().trim()
    };

    console.log(newPost);

    $.ajax("/home/" + email + "/api/content",{type: "POST", data: newPost}).then(function(response){
        console.log(response);
        location.reload();
      });
      

    // $.post("api/users/content", newPost, function(data){
    //     console.log(data);
    //     location.reload();
    // });

});