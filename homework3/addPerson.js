// Handles form submission
$(document).ready(() => {
    $('form').submit(function (event) {
        event.preventDefault();

        var form = $(this);
        // Executes the post
        $.ajax({
            type: 'POST',
            url: '/people',
            data: form.serialize(),
            dataType: 'json',
        });
    });
});