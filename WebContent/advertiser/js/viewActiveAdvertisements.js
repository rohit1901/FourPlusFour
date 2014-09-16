var queryString = window.location.search;
var email = getParameter("email", queryString);

var url = "http://fast-coast-6607.herokuapp.com/credentialService/getAllAdvertisements?email=" + email;
$.ajax(
{
    url : url,
    type: "GET",
    success:function(data, textStatus, jqXHR) 
    {
        $.each(data, function(index, value)
               {
                    var status = getActiveAds(data[index].date);
                    if(status == "true")
                    {
                        $("#grid").append('<li><figure><img src="img/thumb/' + index + '.png" alt="img0' + index + '"/><figcaption><h3>' + data[index].plan + ' off on ' + data[index].product + '</h3><p>This offer is valid only for 1 month from ' + data[index].date + ' only on ' + data[index].usedAt + '.</p></figcaption><figcaption id="delete"><h3>DELETE</h3></figcaption></figure></li>');
                    }

               });
        $("#delete").click(function()
                    {
                        alert("deleted");
                    })
    },
    error: function(jqXHR, textStatus, errorThrown) 
    {
        alert("Some error occurred! Error----" + errorThrown);
    },
    done: function(data)
    {
    }
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

function getActiveAds(advertisementDate)
{
    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();

    var todaysDate = d.getFullYear() + '-' +
        ((''+month).length<2 ? '0' : '') + month + '-' +
        ((''+day).length<2 ? '0' : '') + day;

    
    var todaysDateArr = todaysDate.split("-");
    var advertisementDateArr = advertisementDate.split("-");
    
    if(todaysDateArr[1]-advertisementDateArr[1] <= 1)
    {
        return "true";
    }
    return "false";
}