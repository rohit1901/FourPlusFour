$( document ).ready(function()
{
	var queryString = window.location.search;
	var usernameParam = queryString.split("=");
	var username = usernameParam[1];
	$("#studentName").text(username);
});

