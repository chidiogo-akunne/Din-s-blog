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
            <button class='deletePost btn-danger' data-id='${post.id}'> Delete</button>
            <button onclick="goToEdit('${post.id}')" class='editPost btn-primary' data-id='${post.id}'> Edit</button>
          `))
          );
      });
    }
  });

  //create new posts
  $('#submitPost').on('click', function(e) { // collect the values of data entered
    let data = {
      title: $('#title1').val(),
      author: $('#author1').val(),
      description: $('#description1').val(),
      content1: $('#content1').val(),
      content2: $('content2').val()
    }
    createPost(data); 
  $('#createPost').trigger('reset');//reset the form
  $('#createPost').show();// the toggles the form back after rest
  e.preventDefault();
});
//send data collected to database
function createPost(newData) {
    $.ajax({
      url: 'http://localhost:3000/posts',
      method: 'POST',
      data: newData,
      success: function(newPost) {
        $('#table-body').append($(`<tr data-id='${newPost.id}'>`)
            .append($('<td>').append(newPost.id))
            .append($('<td>').append(newPost.title))
            .append($('<td>').append(newPost.author))
            .append($('<td>').append(newPost.description))
            .append($("<td>").append(`
              <button class='deletePost' data-id='${newPost.id}'> Delete</button>
              <button class='editPost noEdit' data-id='${newPost.id}'> Edit</button>
            `))
        )
      }
    });
  };

 //deletes a single post
 $('#table-body').delegate('.deletePost', 'click', function(){
    alert('Are you sure you want to delete this post?');
    var  $tr = $(this).closest('tr');
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/posts/' + $(this).attr('data-id'),
        success: function(){
            $tr.remove();
      }
      })
    });
 

 //update post
 function goToEdit(postid) {
    sessionStorage.setItem('postid', postid);//onclick of the edit button, the data id will be retrieved 
  }
  // data value will retrieved from database and passed into edit form
  function getPostData() {
    $.ajax({
      url: 'http://localhost:3000/posts/' + sessionStorage.getItem('postid'),
      method: 'GET',
      success: function(posts) {
        $('input#editTitle1').val(posts.title);
        $('input#editAuthor1').val(posts.author);
        $('input#editDescription1').val(posts.description);
        $('input#editContent1').val(posts.content1);
        $('input#editContent2').val(posts.content2);
    }
  })
  $('#editForm').delegate('.update', 'click', function() {
    let editedData = {
      title: $('#editTitle1').val(),
      description:  $('editDescription1').val(),
      author:  $('#editAuthor1').val()
    }

});