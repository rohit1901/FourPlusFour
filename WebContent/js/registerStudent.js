/*Global constants used throughout the file*/

/*Rules*/
var NAME_RULE = /^[a-zA-Z ]*$/;
var AGE_RULE = /^\d+$/;
var SCHOOL = "school";
var ADDRESS = "address";
var EMAIL_RULE = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
var BIO_RULE = /^.{1,200}$/;
var PASSWORD = "password";
var TRUE = "true";
var FALSE = "false";

/*end of global constant declaration*/

$( document ).ready(function()
{
    $("#submit").click(function(e)
    {
        e.preventDefault();
        var postData = $("#myform").serializeArray();
        var formURL = "http://fast-coast-6607.herokuapp.com/credentialService/registerStudent";
        var duplicateUserURL = "http://fast-coast-6607.herokuapp.com/credentialService/duplicateUserExists";
        var name = $("#q1").val();
		var age = $("#q2").val();
		var email = $("#q5").val();
		var bio = $("#q6").val();
		
		var nameValidationErrorMsg = validateParameter(name, NAME_RULE);
		var ageValidationErrorMsg = validateParameter(age, AGE_RULE);
		var emailValidationErrorMsg = validateParameter(email, EMAIL_RULE);
		var bioValidationErrorMsg = validateParameter(bio, BIO_RULE);
		
		//validation checks for name, age, email, and bio
		if((nameValidationErrorMsg == TRUE) && (ageValidationErrorMsg == TRUE) && (emailValidationErrorMsg == TRUE) && (bioValidationErrorMsg == TRUE))
		{
			$.ajax(
			{
				url : duplicateUserURL + "?email=" + email + "&type=child",
				type: "GET",
				success:function(data, textStatus, jqXHR) 
				{
					//alert(duplicateUserURL + "\n" + data);
					if(data.toString() == FALSE)
					{
						$.ajax(
						{
							url : formURL,
							type: "POST",
							data : postData,
							success:function(data, textStatus, jqXHR) 
							{
								/*
								alert("Details submitted successfully. Press OK to login using your new credentials.");
								window.location.href = "loginChild.html";
								*/
								var notification = new NotificationFx({
									message : '<p>Details submitted successfully.\nThis page will redirect to the login screen automatically in a jiffy!</p>',
									layout : 'growl',
									effect : 'slide',
									type : 'notice', // notice, warning or error
									onClose : function() {
										window.location.href = "loginChild.html";
									}
								});

								// show the notification
								notification.show();

							},
							error: function(jqXHR, textStatus, errorThrown) 
							{
								//alert("Some error occurred! Error----" + errorThrown);
								var notification = new NotificationFx({
									message : '<p>Some error occurred! Error----' + errorThrown + '. \nThis page will reload automatically.</p>',
									layout : 'growl',
									effect : 'slide',
									type : 'notice', // notice, warning or error
									onClose : function() {
										location.reload(true);
									}
								});

								// show the notification
								notification.show();
							},
							done: function()
							{
								/*
								alert("Details submitted successfully. Press OK to login using your new credentials.");
								window.location.href = "loginChild.html";
								*/
								var notification = new NotificationFx({
									message : '<p>Details submitted successfully.\nThis page will redirect to the login screen automatically in a jiffy!</p>',
									layout : 'growl',
									effect : 'slide',
									type : 'notice', // notice, warning or error
									onClose : function() {
										window.location.href = "loginChild.html";
									}
								});

								// show the notification
								notification.show();
							}
						});
					}
					else
					{
						//alert("username/email already exists. Please try again with a different email id.");
						var notification = new NotificationFx({
								message : '<p>username/email already exists. Please try again with a different email id.\nThis page will reload automatically in a jiffy!</p>',
								layout : 'growl',
								effect : 'slide',
								type : 'notice', // notice, warning or error
								onClose : function() {
									location.reload(true);
								}
							});

							// show the notification
							notification.show();
					}

				},
				error: function(jqXHR, textStatus, errorThrown) 
				{
					var notification = new NotificationFx({
						message : '<p>Some error occurred! Error----' + errorThrown + '. \nThis page will reload automatically.</p>',
						layout : 'growl',
						effect : 'slide',
						type : 'notice', // notice, warning or error
						onClose : function() {
							location.reload(true);
						}
					});

					// show the notification
					notification.show();
				},
				done: function()
				{
					
				}
			});
			
		}
		else
		{
			var Validation_Error_Message = "Unknown validation error.";
			if(nameValidationErrorMsg.search("Oops!") == 0)
			{
				Validation_Error_Message = nameValidationErrorMsg;
			}
			
			if(ageValidationErrorMsg.search("Oops!") == 0)
			{
				Validation_Error_Message = nameValidationErrorMsg;
			}
			
			if(emailValidationErrorMsg.search("Oops!") == 0)
			{
				Validation_Error_Message = nameValidationErrorMsg;
			}
			
			if(bioValidationErrorMsg.search("Oops!") == 0)
			{
				Validation_Error_Message = nameValidationErrorMsg;
			}
			

			var notification = new NotificationFx({
				message : '<p>' + Validation_Error_Message + '</p>',
				layout : 'growl',
				effect : 'slide',
				type : 'notice', // notice, warning or error
				onClose : function() {
					location.reload(true);
				}
			});

			// show the notification
			notification.show();
		}
    });
	
});

function validateParameter(parameter, rule)
{
	var Validation_Error_Message = TRUE;
	if(rule == NAME_RULE)
	{
		if(parameter.search(NAME_RULE) == -1)
		{
			Validation_Error_Message = "Oops! We do not think that is a name.";
		}				
	}
	
	if(rule == AGE_RULE)
	{
		if(parameter.search(AGE_RULE) == -1)
		{
			Validation_Error_Message = "Oops! Are you sure that is your age? We do not think that is possible!";
		}
	}
	
	if(rule == EMAIL_RULE)
	{
		if(parameter.search(EMAIL_RULE) == -1)
		{
			Validation_Error_Message = "Oops! Please check the email you have entered.";
		}				
	}
	
	if(rule == BIO_RULE)
	{
		if(parameter.search(BIO_RULE) == -1)
		{
			Validation_Error_Message = "Oops! We want you to tell us something about yourself in less than 200 characters.";
		}				
	}
	
	return Validation_Error_Message;
}
