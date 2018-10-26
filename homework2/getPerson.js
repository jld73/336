// Handles form submission
$(document).ready(() => {
    $('form').submit(function (event) {
        event.preventDefault();

        var form = $(this);
        // Executes the get
        $.ajax({
            type: 'GET',
            url: '/person/' + $("#id").val(),
            // Update the page with info if successful
            success: function (resp) {
                $("<em>First Name: " + resp.fname + "<br>Last name: " + resp.lname + "<br>Start: " + resp.start + "<br><br></em>").appendTo("body");
            },
            // Display an error message
            error: function (req) {
                $("<em>Not found<br><br></em>").appendTo("body");
            }
        });
    });
});