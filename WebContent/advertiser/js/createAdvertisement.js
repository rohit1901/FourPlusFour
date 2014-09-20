/*Global constants used throughout the file*/

/*Rules*/
var DISCOUNT_RULE = /^[a-zA-Z ]*$/;
var PRODUCT_RULE = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
var WEBSITE_RULE = /^.{1,200}$/;
var TRUE = "true";
var FALSE = "false";
var EMPTY = "";

/*end of global constant declaration*/

var nlform = new NLForm( document.getElementById( 'nl-form' ) );
var queryString = window.location.search;
//var email = getParameter("email", queryString);
var email = $.session.get('username');

$("#q1").text(email);
$("#q1").val(email);

var discount;
var product;
var website;

var discountValidationErrorMsg;
var productValidationErrorMsg;
var websiteValidationErrorMsg;

$("#submitAd").click(function(event)
{
	discount = $("#q2 option:selected").val();
	product = $("#q3").val();
	website = $("#q4").val();
	
	discountValidationErrorMsg = validateParameter(discount, EMPTY);
	productValidationErrorMsg = validateParameter(product, EMPTY);
	websiteValidationErrorMsg = validateParameter(website, EMPTY);
	
	event.preventDefault();
	var postData = $("#nl-form").serializeArray();
	var formURL = "http://fast-coast-6607.herokuapp.com/credentialService/createAdvertisement";
	
	if(discountValidationErrorMsg == TRUE && productValidationErrorMsg == TRUE && websiteValidationErrorMsg == TRUE)
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
				window.location.href="advertiserDashboard.html?email=" + email;
				*/
				var notification = new NotificationFx({
					message : '<p>Details submitted successfully.\nThis page will redirect automatically in a jiffy!</p>',
					layout : 'growl',
					effect : 'slide',
					type : 'notice', // notice, warning or error
					onClose : function() {
						window.location.href="advertiserDashboard.html?email=" + email;
					}
				});

				// show the notification
				notification.show();

			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
				var notification = new NotificationFx({
					message : '<p>Some error occurred! Error----.' + errorThrown + '\nThis page will reload automatically in a jiffy!</p>',
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
			if(discountValidationErrorMsg.search("Oops!") == 0)
			{
				Validation_Error_Message = discountValidationErrorMsg;
			}
			
			if(productValidationErrorMsg.search("Oops!") == 0)
			{
				Validation_Error_Message = productValidationErrorMsg;
			}
			
			if(websiteValidationErrorMsg.search("Oops!") == 0)
			{
				Validation_Error_Message = websiteValidationErrorMsg;
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

function getParameter(parameter, queryString)
{
	var parameterValue;
	var queryStringParts = queryString.split("&");
	$.each(queryStringParts, function(index, value)
			{
				if(value.search(parameter) != -1)
				{
					var parameterValueArr = value.split("=");
					console.log("parameter " + parameter + "----" + parameterValueArr[1]);
					parameterValue = parameterValueArr[1];
				}
			});
	return parameterValue;
}

function validateParameter(parameter, rule)
{
	var Validation_Error_Message = TRUE;
	if(rule == EMPTY)
	{
		if(parameter == EMPTY)
		{
			Validation_Error_Message = "Oops! You can not leave fields empty here.";
		}				
	}
	
	return Validation_Error_Message;
}
