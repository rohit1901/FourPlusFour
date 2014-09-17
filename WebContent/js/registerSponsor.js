$( document ).ready(function()
{
    $("#submit").click(function(e)
    {
        e.preventDefault();
        var postData = $("#myform").serializeArray();
        var formURL = "http://fast-coast-6607.herokuapp.com/credentialService/registerSponsor";
        var duplicateUserURL = "http://fast-coast-6607.herokuapp.com/credentialService/duplicateUserExists";
        var email = $("#q5").val();
        
        $.ajax(
        {
            url : duplicateUserURL + "?email=" + email + "&type=sponsor",
            type: "GET",
            success:function(data, textStatus, jqXHR) 
            {
                //alert(duplicateUserURL + "\n" + data);
                if(data.toString() == "false")
                {
                    $.ajax(
                    {
                        url : formURL,
                        type: "POST",
                        data : postData,
                        success:function(data, textStatus, jqXHR) 
                        {
                            var notification = new NotificationFx({
								message : '<p>Details submitted successfully.\nThis page will redirect to the login screen automatically in a jiffy!</p>',
								layout : 'growl',
								effect : 'slide',
								type : 'notice', // notice, warning or error
								onClose : function() {
									window.location.href = "loginSponsor.html";
								}
							});

							// show the notification
							notification.show();

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
                            var notification = new NotificationFx({
								message : '<p>Details submitted successfully.\nThis page will redirect to the login screen automatically in a jiffy!</p>',
								layout : 'growl',
								effect : 'slide',
								type : 'notice', // notice, warning or error
								onClose : function() {
									window.location.href = "loginSponsor.html";
								}
							});

							// show the notification
							notification.show();
                        }
                    });
                }
                else
                {
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
        
    });
	
});