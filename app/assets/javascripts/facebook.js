// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1494941110720158',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//   });
// }

function InitFacebook(){
  $('#fblogin').on('click', function(){
    FB.login(function(){
      FB.api('/me', function(response) {
        // alert(JSON.stringify(response));

        if (response.error != null) {

          return;
        }

        console.log('Successful login for: ' + response.name);
        
        $.ajax({
          url: '/main/savefacebookuser', //changed from api
          type: 'POST',
          data: { first_name: response.first_name, last_name: response.last_name, email: response.email, facebook_id: response.id }
        }).done(function(data){
          if (data == null)
            alert('BAD');
          else
            window.location = '/users/' + data;
        });

        // {"id":"10152815450179338","email":"nikebaxter@gmail.com","first_name":"David","gender":"male","last_name":"Baxter","link":"https://www.facebook.com/app_scoped_user_id/10152815450179338/","locale":"en_US","name":"David Baxter","timezone":-4,"updated_time":"2013-05-22T14:19:45+0000","verified":true}
      });
    }, {scope: 'public_profile,email'});
  });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    ProcessFBLogin(response);
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    checkstatus();
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    checkstatus();
  }
}

function ProcessFBLogin(res){
  console.log('PROCESS FB LOGIN');
  var id = $('#hdnID').val();

  if (id !== "") {
    console.log('LOGIN CHECK - "' + id + '"');
    checkstatus();
    return;
  }

  console.log('PROCESS AJAX');

  $.ajax({
    url: '/main/facebooklogin',
    type: 'POST',
    data: { facebook_id: res.authResponse.userID }  
  }).done(function(data){
    // alert(data);
    // if (data === null)
    //   window.location = '/'; // ShowError("Hmm...we couldn't log you in. Might want to try again.");
    // else
    //   $('#hdnID').val(data);
    //   window.location = '/users/' + data;
  });
}