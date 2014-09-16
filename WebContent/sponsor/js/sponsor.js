$( document ).ready(function()
{
	var queryString = window.location.search;
	console.log("queryString----" + queryString);
    
    var username = getParameter("username",queryString);
    console.log("username----" + username);
    
    var amount = getParameter("amount",queryString);
    console.log("amount----" + amount);
    
    $("#contributedAmount").text("" + username + ", you've contributed $" + amount + " till this day.");
});

function getParameter(parameter, queryString)
{
    var parameterValue;
    var queryStringParts = queryString.split("&");
    $.each(queryStringParts, function(index, value)
            {
                if(value.search(parameter) != -1)
                {
                    var parameterValueArr = value.split("=");
                    console.log("parameter " + parameter + "----" + parameterValueArr[1]);
                    parameterValue = parameterValueArr[1];
                }
            });
    return parameterValue;
}