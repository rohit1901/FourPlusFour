$( document ).ready(function()
{
	var username = $.session.get('username');
	$("#studentName").text(username);
    
    $("#learnButton").click(function()
    {
        window.location.href = "studentLearnPage.html";
    });

    $("#testButton").click(function()
    {
        /*var notification = new NotificationFx({
            message : "<p>We aren't ready with our tests but we'll keep you posted!</p>",
            layout : 'growl',
            effect : 'slide',
            type : 'notice', // notice, warning or error
            onClose : function() {
                //window.location.href = "welcomeStudent.html";
            }
        });

        // show the notification
        notification.show();*/
});
});

