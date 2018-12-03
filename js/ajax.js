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

//Falls sich etwas ändert im dropdown "beruf-dropdown"
//Ein Beruf wurde gewählt
$(document).on('change', '#beruf-dropdown', function() {
    //Tafel und Klassenauswahl leeren
    $('.calendarrow').html("");
    $('#klasse-dropdown').html("");
    var bid = "";
    //Setzen des Strings (nach http://sandbox.gibm.ch/klassen.php)
    if ($('#beruf-dropdown').val() != -1) {
        bid = "?beruf_id=" + $('#beruf-dropdown').val();
    }
    //führe getClass mit dem Parameter bid aus
    getClass(bid);
});
//Falls sich etwas ändert im dropdown "klasse-dropdown"
//Eine Klasse wurde gewählt
$(document).on('change', '#klasse-dropdown', function() {
    fillTafel();
})
//Zeigt alle Klassen an
//Falls nur eine Klasse vorhanden ist, wähle diese aus
function getClass(bid) {
    //getJSON Abfrage
    $.getJSON("http://sandbox.gibm.ch/klassen.php" + bid, function(data) {
        //Falls mehr als eine Klasse zurück kommt
        if (data.length > 1) {
            //Setze "Wählen Sie eine Klasse" erneut
            //Für manuelles wählen der Klasse
            $('#klasse-dropdown').append("<option value='-5'> Wählen Sie eine Klasse </option>");
        } else if (data.length == 0) { //Falls es keine Klassen gibt
            //Leeren der vorherigen Tabelle
            $('.calendarrow').html("");
            $('.calendarrow').append("<tr><td colspan='5'>Für diesen Beruf gibt es zurzeit keine Klasse.</td></tr>");
        }
        var items = [];
        $.each(data, function(key, val) {
            $('#klasse-dropdown').append("<option value='" + val.klasse_id + "'>" + val.klasse_longname + "</option>");
        });
        if (data.length == 1) {
            fillTafel();
        }
    });
}

//Wenn eine Klasse ausgewählt wurde
//Einfüllen der Tafel in die Tabelle
function getTafel(kid) {
    $.getJSON("http://sandbox.gibm.ch/tafel.php/" + kid, function(data) {
        var items = [];
        $.each(data, function(key, val) {
            $('.calendarrow').append("<tr><th>" + val.tafel_von + "</th>" + "<th>" + val.tafel_bis + "</th>" + "<th>" + val.tafel_longfach + "</th>" + "<th>" + val.tafel_lehrer + "</th>" + "<th>" + val.tafel_raum + "</th>");
        });
    });
}
//Falls es nur eine Klasse gibt für den Beruf
//durch "getTafel(kid)" Einfüllen der Tafel in die Tabelle
function fillTafel() {
    $('.calendarrow').html("");
    var kid = "";
    if ($('#klasse-dropdown').val() != -5) {
        kid = "?klasse_id=" + $('#klasse-dropdown').val() + "&woche=" + today;
    }
    getTafel(kid);
}
