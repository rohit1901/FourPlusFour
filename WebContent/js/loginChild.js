$( document ).ready(function()
{
	var type = "child";
    $("#studentLoginForm").submit(function(e)
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
			            window.location.href = "welcomeStudent.html?username=" + username;
                    }
                    else
                    {
                        alert("Invalid credentials entered. data obtained: " + data + "\n username: " + username + "\n password: " + password + "type: " + type);
                        location.reload(true);
                    }

                });
}