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
            <a href="update.html" onclick="goToEdit('${post.id}')" class='editPost noEdit' data-id='${post.id}'> Edit</a>

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

    //contact us

  $('#contact-us').on('click', function(e) {
    let data = {
      name: $('#contact-name').val(),
      email: $('#contact-email').val(),
      number: $('#contact-number').val(),
      message: $('#contact-message').val()
    }
    createContact(data);
    $('#contactForm').trigger('reset');
    $('#contactForm').show();
    e.preventDefault();
    })
    function createContact(contactData) {
      $.ajax({
        url: 'http://localhost:3000/contacts',
        method: 'POST',
        data: contactData,
        success: function() {
          alert('Message sent successfully, we will get back to you soon!');
          console.log(contactData);
        }
      });
    }

  });


    
    
 //update post
 function goToEdit(postid) {
  sessionStorage.setItem('postid', postid);
}

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
  //take new values from form
  $('#update').on('click', function(e) {
    let data = {
      title: $('#editTitle1').val(),
      author:  $('#editAuthor1').val(),
      description:  $('editDescription1').val()
    }

  
    editForm(data);
    $('#editForm').trigger('reset');//resets the form field after you submit post
    $('#editForm').show(); // toggles the form back after it resets
    e.preventDefault();
  });

  function editForm(edit){
  $.ajax({
        type:'PUT',
        data: edit,
        url: 'http://localhost:3000/posts/' + sessionStorage.getItem('postid'),
        success: function (editedPost){
          $('#table-body').append($(`<tr data-id='${editedPost.id}'>`)
            .append($('<td>').append(editedPost.id))
            .append($('<td>').append(editedPost.title))
            .append($('<td>').append(editedPost.author))
            .append($('<td>').append(editedPost.description))
            .append($("<td>").append(`
              <button class='deletePost' data-id='${editedPost.id}'> Delete</button>
              <button class='editPost noEdit' data-id='${editedPost.id}'> Edit</button>
            `))
            
          )
        }
      })
    }

}
