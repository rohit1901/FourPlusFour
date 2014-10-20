$( document ).ready(function()
{
	$.session.clear();
    var type = "advertiser";
    $("#advertiserLoginForm").submit(function(e)
	{
		$("#loginAdvertiser").prop('disabled', true);
        
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
                        $.session.set('username',username);
                        var notification = new NotificationFx({
							message : '<p>Welcome \n' + $.session.get('username') + '\nThis page will redirect automatically in a jiffy!</p>',
							layout : 'growl',
							effect : 'slide',
							type : 'notice', // notice, warning or error
							onClose : function() {
								window.location.href = "advertiser/advertiserDashboard.html";
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