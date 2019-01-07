// Kalenderwoche + Jahr
var date = moment();
var tafel_formated = "";

$('.thisweek').html(date.week());
$('.thisyear').html(date.year());

// Wenn Button nach links gedrückt wird (eine Kalenderwoche zurück)
// A.3 Button „zurück“ zeigt den korrekten Stundenplan eine Woche in der Vergangenheit
$('#minusone').on("click", function() {
    if ($('#klasse-dropdown').val() != -5) {
        // A.4 Aktualisiertes Jahr und Kalenderwoche werden angezeigt
        date.subtract(7, 'days');
        // 3.3 Jahr und Wochennummer
        $('.thisweek').html(date.week());
        $('.thisyear').html(date.year());
        fillTafel();
    } else {
        alertClass();
    }
});

// Wenn Buton nach rechts gedrückt wird (nächste Kalenderwoche)
// A.2 Button „vor“ zeigt den korrekten Stundenplan eine Woche ind er Zukunft
$('#plusone').on("click", function() {
    if ($('#klasse-dropdown').val() != -5) {
        // A.4 Aktualisiertes Jahr und Kalenderwoche werden angezeigt
        date.add(7, 'days');
        // 3.3 Jahr und Wochennummer
        $('.thisweek').html(date.week());
        $('.thisyear').html(date.year());
        fillTafel();
    } else {
        alertClass();
    }
});

// Array für die Anzeige der Wochentage
// 0 = Sonntag da Montag der erste Wochentag ist
const weekday = new Array(7);
weekday[0] = "Sonntag";
weekday[1] = "Montag";
weekday[2] = "Dienstag";
weekday[3] = "Mittwoch";
weekday[4] = "Donnerstag";
weekday[5] = "Freitag";
weekday[6] = "Samstag";
