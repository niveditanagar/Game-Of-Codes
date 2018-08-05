$("#view-profile").on("click", function(event){
    event.preventDefault();
    console.log("Button is working");

    $.get("/home/:Email/profile", function(data){
        console.log(data);
    });

});