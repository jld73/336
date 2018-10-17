$(document).ready(() => {
    $('form').submit(function (event) {
        console.log("Form submitted")
        event.preventDefault();

        var form = $(this);

        $.ajax({
            type: 'POST',
            url: '/person',
            data: form.serialize(),
            dataType: 'json',
            success: function (resp) {
                console.log(resp);
            }
        });
    });
});