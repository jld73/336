console.log("OO")

$(document).ready(function () {

    $('button').click(function () {

        $.ajax({
            url: "/data",
            type: "GET",
            data: {
                name: "lab07"
            }
        }).done(function (result) {
            console.log(result);
            $("<em>", { html: result }).appendTo("body");
        }).fail(function (xhr, status, error) {
            $("<em>", { html: error }).appendTo("body");
        })
    });

});
