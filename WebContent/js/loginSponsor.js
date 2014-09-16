$( document ).ready(function()
{
	var type = "sponsor";
    $("#sponsorLoginForm").submit(function(e)
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
                        getSponsorAmount(username);
                    }
                    else
                    {
                        alert("Invalid credentials entered!\nData obtained: " + data + ",\nusername: " + username + ",\npassword: " + password + ",\ntype: " + type + "");
                        location.reload(true);
                    }

                });
}

function getSponsorAmount(username)
{
    $.ajax(
        {
          url: "http://fast-coast-6607.herokuapp.com/credentialService/getSponsorAmount?username=" + username,
          context: document.body
        }).done(function(data) 
                {
                    var amount = data.toString();
                    alert("Welcome " + username);
                    window.location.href = "sponsor/sponsorDashboard.html?username=" + username + "&amount=" + amount;
                });
}