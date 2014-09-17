$( document ).ready(function()
{
	var type = "advertiser";
    $("#advertiserLoginForm").submit(function(e)
	{
		var username = $("#username").val();
        var password = $("#password").val();
        e.preventDefault();
        
        matchCredentials(username,password,type);
    })
	
});

function matchCredentials(username,password,type)
{
    $.ajax(
        {
          url: "http://fast-coast-6607.herokuapp.com/credentialService/matchCredentials?username=" + username + "&password=" + password + "&type=" + type,
          context: document.body
        }).done(function(data) 
                {
                    if(data.toString() === "true")
                    {
                        var notification = new NotificationFx({
							message : '<p>Welcome \n' + username + '\nThis page will redirect automatically in a jiffy!</p>',
							layout : 'growl',
							effect : 'slide',
							type : 'notice', // notice, warning or error
							onClose : function() {
								window.location.href = "advertiser/advertiserDashboard.html?email=" + username;
							}
						});

						// show the notification
						notification.show();
                    }
                    else
                    {
                        var notification = new NotificationFx({
							message : '<p>Invalid Credentials entered.\nThis page will reload automatically in a jiffy!</p>',
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
}