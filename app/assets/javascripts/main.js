$(document).ready(function(){

	InitFacebook();

	$('#btnLogout').on('click', function(){
		FB.logout(function(response) {
			// user is now logged out
		});

		$('#hdnID').val('');
		$.ajax({ url:'/main/logout'}).done(
			function(){
				window.location = '/';
			});
	});

	// var lo = getQueryVariable("loggedout");
	// if (lo == "true")
	// 	ShowSuccess("Thanks for logging out");

	// function SendSignup(){
	// 	var email = $('#emailbox').val();

	// 	if (email === "" || !ValidateEmail(email)){
	// 		ShowError('Please enter a valid email address!');
	// 		$('#emailbox').focus();
	// 		return;
	// 	}

	// 	$.ajax({
	// 		url: '/main/savesignup',
	// 		type: 'POST',
	// 		data: { email: email }
	// 	}).done(function(data){
	// 		if (data === null){
	// 			ShowError('Looks like you have already signed up!');
	// 			return;
	// 		}

	// 		HideDialog();

	// 		ShowSuccess("Thanks for signing up! We'll keep you posted on our progress.");
	// 		$('#emailbox').val('');
	// 	});
	// }

	

	// function ValidateEmail(value) {
	//     var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	//     if (reg.test(value))
	//         return (true);

	//     return (false);
	// }

});

function checkstatus(){
	var id = $('#hdnID').val();
	console.log("CHECK STATUS - " + id);

	if (id !== "") {
		$('#fblogin').hide();
		$('#btnLogout').show();
	}
	else {
		$('#btnLogout').hide();
		$('#fblogin').show();
	}
}

function HideDialog(){
	var d = $('.dialog');
	d.animate({
		top: '-500px'
	}, 500, function(){
		d.hide();
		$('#overlay').fadeOut('fast');
	});
}

function ShowError(text) {
    $('#error').html(text);
    $('#error').show();
    $('#error').animate({ bottom: '0' }, 500);

    setTimeout(function () {
        $('#error').animate({ bottom: '-50px' }, 500,
            function () {
                $('#error').hide();
            });
    }, 6000);
}

function ShowSuccess(text) {
    $('#success').html(text);
    $('#success').show();
    $('#success').animate({ bottom: '0' }, 500);

    setTimeout(function () {
        $('#success').animate({ bottom: '-50px' }, 500,
            function () {
                $('#success').hide();
            });
    }, 4000);
}
