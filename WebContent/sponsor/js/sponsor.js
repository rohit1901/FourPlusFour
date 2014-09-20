$( document ).ready(function()
{
	var queryString = window.location.search;
	console.log("queryString----" + queryString);
    
    //var username = getParameter("username",queryString);
    var username = $.session.get('username');
    console.log("username----" + username);
    
    //var amount = getParameter("amount", queryString);
    var amount = localStorage.getItem('amount');
    console.log("amount----" + amount);
    
    $("#contributedAmount").text("" + username + ", you've contributed $" + amount + " till this day.");
    
    $("#contributeButton").click(function(e)
        {
            e.preventDefault();
            window.location.href = "paymentDashboard.html";
        });
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