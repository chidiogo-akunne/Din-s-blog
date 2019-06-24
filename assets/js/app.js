// login validation
function validatelogin(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username && password){
    alert ("Login successfully");
    window.location = "admin.html"; 
    return false;
    }
    else{
    alert("Fill in all input");
    }
}

// signup validation
function validatesignup(){
    var username = document.getElementById("username").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (username && firstname && lastname && email && password){
    alert ("signup successfully");
    window.location = "admin.html"; 
    return false;
    }
    else{
    alert("Fill in all input");
    }
}


$(document).ready(function(){
   //list out all post on a table
   $.ajax({
    url: 'http://localhost:3000/posts',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      $(data).each(function(i, post) {
        $('#table-body').append($('<tr>')
            .append($('<td>').append(post.id))
            .append($('<td>').append(`${post.title}`))
            .append($('<td>').append(`${post.description}`))
            .append($('<td>').append(`${post.author}`))
            .append($("<td>").append(`
            <button class='deletePost' data-id='${post.id}'> Delete</button>
            <button onclick="goToEdit('${post.id}')" class='editPost noEdit' data-id='${post.id}'> Edit</button>
          `))
          );
      });
    }
  });






});