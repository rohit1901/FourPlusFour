$( document ).ready(function()
{
	var username = $("#username").val();
    var password = $("#password").val();
    var type = "child";
    $("#studentLoginForm").submit(function(e)
	{
		e.preventDefault();
        matchCredentials(username,password,type)
	})
	
});

function matchCredentials(username,password,type)
{
    $.ajax(
        {
          url: "http://fast-coast-6607.herokuapp.com/matchCredentials?username=" + username + "&password=" + password + "&type=" + type +"",
          context: document.body
        }).done(function(data) 
                {
                    if(data.toString() === "true")
                    {
                        alert("Welcome" + username + ");
			            window.location.href = "welcomeStudent.html";
                    }
                    else
                    {
                        alert("Invalid credentials entered. data obtained: " + data);
                        location.reload(true);
                    }

                }
                });
}