$( document ).ready(function()
{
	$("#studentLoginForm").submit(function(e)
	{
		e.preventDefault();
		if($("#username").val() == "test" && $("#password").val() == "test")
		{
			alert("Welcome Test!");
			window.location.href = "welcomeStudent.html";
		}
		else if(($("#username").val() != "test" || $("#password").val() != "test") && ($("#username").val().length > 0 && $("#password").val().length > 0))
		{
			alert("incorrect username or password. Please re-login.");
			location.reload(true);
		}
	})
	
});