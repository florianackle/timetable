$('#beruf-dropdown').append("<option value='-1'> Wählen Sie einen Beruf </option>");
$('#klasse-dropdown').append("<option value='-5'> Wählen Sie eine Klasse </option>");
var today = moment().week() + "-" + moment().year();

$.getJSON("http://sandbox.gibm.ch/berufe.php", function(data) {
    var items = [];
    $.each(data, function(key, val) {
        $('#beruf-dropdown').append("<option value='" + val.beruf_id + "'>" + val.beruf_name + "</option>");
    });
});
getClass("");

$(document).on('change', '#beruf-dropdown', function() {
    $('#klasse-dropdown').html("");
    console.log($('#beruf-dropdown').val());
    var bid = "";

    if ($('#beruf-dropdown').val() != -1) {
        bid = "?beruf_id=" + $('#beruf-dropdown').val();
    }
    getClass(bid);
});

$(document).on('change', '#klasse-dropdown', function() {
    $('.calendarrow').html("");
    var kid = "";
    if ($('#klasse-dropdown').val() != -5) {
        kid = "?klasse_id=" + $('#klasse-dropdown').val() + "&woche=" + today;
    }
    getTafel(kid);
})

function getClass(bid) {
    $.getJSON("http://sandbox.gibm.ch/klassen.php" + bid, function(data) {
        var items = [];
        $.each(data, function(key, val) {
            $('#klasse-dropdown').append("<option value='" + val.klasse_id + "'>" + val.klasse_longname + "</option>");
        });
    });
}

function getTafel(kid) {
    $.getJSON("http://sandbox.gibm.ch/tafel.php/" + kid, function(data) {
        var items = [];
        $.each(data, function(key, val) {
            $('.calendarrow').append("<tr><th>" + val.tafel_von + "</th>" + "<th>" + val.tafel_bis + "</th>" + "<th>" + val.tafel_longfach + "</th>" + "<th>" + val.tafel_lehrer + "</th>" + "<th>" + val.tafel_raum + "</th>");
        });
    });
}
