
var email = localStorage.getItem("Email");
console.log(email);

// Quill.js
var options = {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
};

var editor = new Quill('#post-content', options);

// var preciousContent = document.getElementById('myPrecious');
// var justTextContent = document.getElementById('justText');
// var justHtmlContent = document.getElementById('justHtml');

var delta;
var text;
var justHtml;

editor.on('text-change', function () {
    delta = editor.getContents();
    text = editor.getText();
    justHtml = editor.root.innerHTML;
    // preciousContent.innerHTML = JSON.stringify(delta);
    justTextContent.innerHTML = text;
    justHtmlContent.innerHTML = justHtml;

    log("text: ", text);
    log("delta: ", delta);
    log("justHtml: ", justHtml);

    // The delta object
    console.log("Delta object: ", delta.ops[0].insert);
});


$.get("/home/" + email + "/api/content", function (data) {
    console.log(data);
    location.replace("/home/" + email + "/api/content");
})




$("#view-profile").on("click", function (event) {
    event.preventDefault();
    console.log("Button is working");

    $.get("/home/" + email + "/profile", function (data) {
        console.log(data);
        location.replace("/home/" + email + "/profile");
    });

});



$("#submit-content").on("click", function (event) {
    event.preventDefault();
    log("on submit:--------------");
    log("text: ", text);
    log("delta: ", delta);
    log("justHtml: ", justHtml.innerHTML);
    log("Delta object: ", delta.ops[0].insert);
    log("Delta: ", delta);
    
    
    var newPost = {
        content: justHtml
    };

    //$("#user-latest-post").html(justHtml)

    console.log(newPost);

    $.ajax("/home/" + email + "/api/content", {
        type: "POST",
        data: newPost
    }).then(function (response) {
        console.log(response);
        // location.reload();
    });


    // $.post("api/users/content", newPost, function(data){
    //     console.log(data);
    //     location.reload();
    // });

});
