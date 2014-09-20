$( document ).ready(function()
{
	var username = $.session.get('username');
	$("#studentName").text(username);
});

