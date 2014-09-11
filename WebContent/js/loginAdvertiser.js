$( document ).ready(function()
{
	var type = "advertiser";
    $("#advertiserLoginForm").submit(function(e)
	{
		var username = $("#username").val();
        var password = $("#password").val();
        e.preventDefault();
        
        if(username == "advertiser" && password == "advertiser")
		{
			alert("Welcome " + username);
			window.location.href = "advertiser/advertiserDashboard.html";
		}
		else
		{
			alert("Invalid credentials entered. data obtained: " + "false" + "\n username: " + username + "\n password: " + password + "type: " + type);
            location.reload(true);
		}
		//matchCredentials(username,password,type);
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
			            window.location.href = "welcomeStudent.html";
                    }
                    else
                    {
                        alert("Invalid credentials entered. data obtained: " + data + "\n username: " + username + "\n password: " + password + "type: " + type);
                        location.reload(true);
                    }

                });
}