$('#beruf-dropdown').append("<option value='-1'> Wählen Sie einen Beruf </option>");
$('#klasse-dropdown').append("<option > Wählen Sie eine Klasse </option>");

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

function getClass(bid){
    $.getJSON("http://sandbox.gibm.ch/klassen.php" + bid, function(data) {
        var items = [];
        $.each(data, function(key, val) {
            $('#klasse-dropdown').append("<option value='" + val.klasse_id + "'>" + val.klasse_longname + "</option>");
        });
    });
}
