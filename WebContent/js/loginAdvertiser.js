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
                        alert("Welcome " + username + "");
			            window.location.href = "advertiser/advertiserDashboard.html?email=" + username;
                    }
                    else
                    {
                        alert("Invalid credentials entered!\n Data obtained: " + data + ". \n username: " + username + ",\n password: " + password + ", \n type: " + type);
                        location.reload(true);
                    }

                });
}