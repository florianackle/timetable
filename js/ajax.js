// 1.4 Select-Boxen mit Aufforderung zur Auswahl
// 4.4 Die gewählte Berufsgruppe ist ersichtlich.
// 5.4 Die gewählte Berufsgruppe und Klasse ersichtlich.
$('#beruf-dropdown').append("<option value='-1'> Wählen Sie einen Beruf </option>");
$('#klasse-dropdown').append("<option value='-5'> Wählen Sie eine Klasse </option>");

//Heutiger Wochentag (0=Sonntag, 1=Montag, 2=Dienstag etc...)
var day = "";

// 2.1 Datenabfrage
// 4.1 Alle Berufsgruppen sind vorhanden und sortiert
$.getJSON("http://sandbox.gibm.ch/berufe.php", function(data, status, xhr) {
    //HTTP Status überprüfen (200 = OK)
    if (xhr.status == 200) {
        console.log("Berufe konnten erfolgreich geladen werden");
        var items = [];
        $.each(data, function(key, val) {
            $('#beruf-dropdown').append("<option value='" + val.beruf_id + "'>" + val.beruf_name + "</option>");
        });
    }
    // Falls nicht ok, Error Meldungen in die Konsole
    // 2.2 Fehlermeldung, wenn AJAX-Request nicht funktioniert.
    else {
        alert(xhr.status);
        alert(xhr.response);
        alert(xhr.responseText)
        alert(xhr.statusText);
    }
});
//Sobald alle Berufe geladen wurden, getClass ausführen
getClass("");

//Falls sich etwas ändert im dropdown "beruf-dropdown"
//Ein Beruf wurde gewählt
// 4.2 Bei jedem Wechsel der Berufsgruppe werden die Daten in der Klassen-Auswahl neu geladen
$('#beruf-dropdown').on('change', function() {
    //Tafel und Klassenauswahl leeren
    // 4.3 Der Stundenplan wird ausgeblendet, wenn die Berufsgruppe verändert wird.
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
$('#klasse-dropdown').on('change', function() {
    fillTafel();
})
//Zeigt alle Klassen im Dropdown an
//Falls nur eine Klasse vorhanden ist, wähle diese aus
function getClass(bid) {
    // 2.1 Datenabfrage
    $.getJSON("http://sandbox.gibm.ch/klassen.php" + bid, function(data, status, xhr) {
        //HTTP Status überprüfen (200 = OK)
        if (xhr.status == 200) {
            console.log("Klassen konnten erfolgreich geladen werden");
            //Falls mehr als eine Klasse zurück kommt
            if (data.length > 1) {
                //Setze "Wählen Sie eine Klasse" erneut
                //Für manuelles wählen der Klasse
                $('#klasse-dropdown').append("<option value='-5'> Wählen Sie eine Klasse </option>");
            } else if (data.length == 0) { //Falls es keine Klassen gibt
                //Leeren der vorherigen Tabelle
                $('.calendarrow').html("");
                $('.calendarrow').append("<tr><td colspan='7'>Für diesen Beruf gibt es zurzeit keine Klasse.</td></tr>");
            }
            // 5.2 Alle Klassen sind vorhanden und sortiert
            var items = [];
            $.each(data, function(key, val) {
                $('#klasse-dropdown').append("<option value='" + val.klasse_id + "'>" + val.klasse_longname + "</option>");
            });
            if (data.length == 1) {
                fillTafel();
            }
        }
        // Falls nicht ok, Error Meldungen in die Konsole
        // 2.2 Fehlermeldung, wenn AJAX-Request nicht funktioniert.
        else {
            alert(xhr.status);
            alert(xhr.response);
            alert(xhr.responseText)
            alert(xhr.statusText);
        }
    });

}
//Wenn eine Klasse ausgewählt wurde
//Einfüllen der Tafel in die Tabelle
// 5.3 Beim Wechsel der Klasse wird der Stundenplan der Klasse in der aktuellen Woche angezeigt.
function setTafel(kid) {
    // 2.1 Datenabfrage
    $.getJSON("http://sandbox.gibm.ch/tafel.php/" + kid, function(data, status, xhr) {
        //HTTP Status überprüfen (200 = OK)
        if (xhr.status == 200) {
            console.log("Tafel konnte erfolgreich geladen werden");
            var items = [];
            if (data.length == 0) {
                $('.calendarrow').append("<tr><th colspan='7'> In dieser Woche wurden keine Daten gefunden. </br>Eventuell findet in dieser woche kein Unterricht statt, oder es wurden für diesen Zeitraum noch keine Daten eingegeben. </th></tr>");
            } else {
                $.each(data, function(key, val) {
                    day == val.tafel_wochentag;
                    // 6.1 Datum, Wochentag, von, bis, Lehrer, Fach, Zimmer vorhanden
                    $('.calendarrow').append("<tr><th>" + val.tafel_datum + "</th>" + "<th>" + weekday[val.tafel_wochentag] + "</th>" + "<th>" + val.tafel_von + "</th>" + "<th>" + val.tafel_bis + "</th>" + "<th>" + val.tafel_longfach + "</th>" + "<th>" + val.tafel_lehrer + "</th>" + "<th>" + val.tafel_raum + "</th>");
                });
            }
        }
        // Falls nicht ok, Error Meldungen in die Konsole
        // 2.2 Fehlermeldung, wenn AJAX-Request nicht funktioniert.
        else {
            alert(xhr.status);
            alert(xhr.response);
            alert(xhr.responseText)
            alert(xhr.statusText);
        }
    });
}
//Falls es nur eine Klasse gibt für den Beruf
//durch "setTafel(kid)" Einfüllen der Tafel in die Tabelle
function fillTafel() {
    $('.calendarrow').html("");
    var kid = "";
    if ($('#klasse-dropdown').val() != -5) {
        kid = "?klasse_id=" + $('#klasse-dropdown').val() + "&woche=" + today;
    }
    setTafel(kid);
}
