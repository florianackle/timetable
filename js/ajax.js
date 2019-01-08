// 1.4 Select-Boxen mit Aufforderung zur Auswahl
// 4.4 Die gewählte Berufsgruppe ist ersichtlich.
// 5.4 Die gewählte Berufsgruppe und Klasse ersichtlich.
$('#beruf-dropdown').append("<option value='-1'> Wählen Sie einen Beruf </option>");

// Setzen der Variable "alertmsg"
// Sollte die Variable nicht 0 sein, kommt eine Fehlermeldung
// siehe --> diverse.js --> alert();
var alertmsg = 0;

// 2.1 Datenabfrage mit $.getJSON
// 4.1 Alle Berufsgruppen sind vorhanden und sortiert
$.getJSON("http://sandbox.gibm.ch/berufe.php", function(data) {
        var items = [];
        $.each(data, function(key, val) {
            // Berufe im Dropdown anzeigen
            $('#beruf-dropdown').append("<option value='" + val.beruf_id + "'>" + val.beruf_name + "</option>");
        });
    })
    // 2.2 Fehlermeldung, wenn AJAX-Request nicht funktioniert.
    .fail(function() {
        alertmsg = 1;
        alert();
    });
// Sobald alle Berufe geladen wurden, getClass ausführen
// Parameter leer, damit alle Klassen gezeigt werden.
getClass("");

// Falls sich etwas ändert im dropdown "beruf-dropdown"
// Ein Beruf wurde gewählt
// 4.2 Bei jedem Wechsel der Berufsgruppe werden die Daten in der Klassen-Auswahl neu geladen
$('#beruf-dropdown').on('change', function() {
    // Buttons aktivieren
    $('#minusone').prop("disabled", false);
    $('#plusone').prop("disabled", false);
    $('#default-week').prop("disabled", false);
    // Tafel und Klassenauswahl leeren
    // 4.3 Der Stundenplan wird ausgeblendet, wenn die Berufsgruppe verändert wird.
    $('.calendarrow').html("");
    $('#klasse-dropdown').html("");
    var bid = "";
    // Setzen des Strings (nach http://sandbox.gibm.ch/klassen.php)
    if ($('#beruf-dropdown').val() != -1) {
        bid = "?beruf_id=" + $('#beruf-dropdown').val();
    }
    // führe getClass mit dem Parameter bid aus
    getClass(bid);
});
// Falls sich etwas ändert im dropdown "klasse-dropdown"
// Eine Klasse wurde gewählt
$('#klasse-dropdown').on('change', function() {
    fillTafel();
})
// Zeigt alle Klassen im Dropdown an
// Falls nur eine Klasse vorhanden ist, wähle diese aus
function getClass(bid) {
    // 2.1 Datenabfrage mit $.getJSON
    $.getJSON("http://sandbox.gibm.ch/klassen.php" + bid, function(data) {
            // Falls mehr als eine Klasse zurück kommt
            if (data.length > 1) {
                // Setze "Wählen Sie eine Klasse" erneut
                // Für manuelles wählen der Klasse
                $('#klasse-dropdown').append("<option value='-5'> Wählen Sie eine Klasse </option>");
            } else if (data.length == 0) { //Falls es keine Klassen gibt
                //Leeren der vorherigen Tabelle
                $('.calendarrow').html("");
                $('.calendarrow').hide().fadeIn(400).append("<tr><td colspan='7'>Für diesen Beruf gibt es zurzeit keine Klasse.</td></tr>");
                // Buttons deaktivieren
                $('#minusone').prop("disabled", true);
                $('#plusone').prop("disabled", true);
                $('#default-week').prop("disabled", true);
            }
            // 5.2 Alle Klassen sind vorhanden und sortiert
            var items = [];
            $.each(data, function(key, val) {
                $('#klasse-dropdown').append("<option value='" + val.klasse_id + "'>" + val.klasse_longname + "</option>");
            });
            if (data.length == 1) {
                fillTafel();
            }
        })
        // 2.2 Fehlermeldung, wenn AJAX-Request nicht funktioniert.
        .fail(function() {
            alertmsg = 2;
            alert();
        });
}

//durch "setTafel(kid)" Einfüllen der Tafel in die Tabelle
function fillTafel() {
    $('.calendarrow').html("");
    var kid = "";
    if ($('#klasse-dropdown').val() != -5) {
        kid = "?klasse_id=" + $('#klasse-dropdown').val() + "&woche=" + date.week() + "-" + date.year();
    }
    setTafel(kid);
}

// Wenn eine Klasse ausgewählt wurde
// Einfüllen der Tafel in die Tabelle
// 5.3 Beim Wechsel der Klasse wird der Stundenplan der Klasse in der aktuellen Woche angezeigt.
function setTafel(kid) {
    // 2.1 Datenabfrage mit $.getJSON
    $.getJSON("http://sandbox.gibm.ch/tafel.php/" + kid, function(data) {
            var items = [];
            if (data.length == 0) {
                // A.5 Bei Ferien wird eine sinvolle Meldung angezeigt
                $('.calendarrow').hide().fadeIn(400).append("<tr><td colspan='7'> In dieser Woche wurden keine Daten gefunden. </br>Eventuell findet in dieser woche kein Unterricht statt, oder es wurden für diesen Zeitraum noch keine Daten eingegeben. </td></tr>");
            } else {
                $.each(data, function(key, val) {
                    // 6.1 Datum, Wochentag, von, bis, Lehrer, Fach, Zimmer vorhanden
                    // 6.6 Jahr und Wochennummer wird ausgegeben
                    /* Datum wird direkt von YYYY-MM-DD zu DD-MM-YYYY formatiert,
                       mittels moment().format()*/
                    $('.calendarrow').hide().fadeIn(400).append("<tr><td>" + moment(val.tafel_datum).format("DD.MM.YYYY") + "</td>" + "<td>" + weekday[val.tafel_wochentag] + "</td>" + "<td>" + moment(val.tafel_von, "HH:mm:ss").format("HH:mm") + "</td>" + "<td>" + moment(val.tafel_bis, "HH:mm:ss").format("HH:mm") + "</td>" + "<td>" + val.tafel_longfach + "</td>" + "<td>" + val.tafel_lehrer + "</td>" + "<td>" + val.tafel_raum + "</td>");
                });
            }
        })
        // 2.2 Fehlermeldung, wenn AJAX-Request nicht funktioniert.
        .fail(function() {
            alertmsg = 3;
            alert();
        });
}
