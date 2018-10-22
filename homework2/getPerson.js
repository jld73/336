$(document).ready(() => {
    $('form').submit(function (event) {
        console.log("Form submitted")
        event.preventDefault();

        var form = $(this);

        $.ajax({
            type: 'GET',
            url: '/people/' + $("#id").val(),
            success: function (resp) {
                $("<em>First Name: " + resp.fname + "<br>Last name: " + resp.lname + "<br>Start: " + resp.start + "<br><br></em>").appendTo("body");
            },
            error: function (req) {
                $("<em>Not found<br><br></em>").appendTo("body");
            }
        });
    });
});