$( document ).ready(function()
{
    $("#submit").click(function(e)
    {
        e.preventDefault();
        var postData = $("#myform").serializeArray();
        var formURL = "http://fast-coast-6607.herokuapp.com/credentialService/registerAdvertiser";
        var duplicateUserURL = "http://fast-coast-6607.herokuapp.com/credentialService/duplicateUserExists";
        var email = $("#q5").val();
        
        $.ajax(
        {
            url : duplicateUserURL + "?email=" + email + "&type=advertiser",
            type: "GET",
            success:function(data, textStatus, jqXHR) 
            {
                alert(duplicateUserURL + "\n" + data);
                if(data == "false")
                {
                    $.ajax(
                    {
                        url : formURL,
                        type: "POST",
                        data : postData,
                        success:function(data, textStatus, jqXHR) 
                        {
                            alert("Details submitted successfully. Press OK to login using your new credentials.");
                            window.location.href = "loginAdvertiser.html";

                        },
                        error: function(jqXHR, textStatus, errorThrown) 
                        {
                            alert("Some error occurred! Error----" + errorThrown);
                        },
                        done: function()
                        {
                            alert("Details submitted successfully. Press OK to login using your new credentials.");
                            window.location.href = "loginAdvertiser.html";
                        }
                    });
                }
                else
                {
                    alert("username/email already exists. Please try again with a different email id.");
                }

            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                alert("Some error occurred! Error----" + errorThrown);
            },
            done: function()
            {
                alert("Details submitted successfully. Press OK to login using your new credentials.");
            }
        });
        
    });
	
});