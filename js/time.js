//Kalenderwoche + Jahr
var year = moment();
var date = moment();

$('.thisweek').html(date.week());
$('.thisyear').html(date.year());

//Wenn Button nach links gedrückt wird (eine Kalenderwoche zurück)
$('#minusone').on("click", function() {
    date.subtract(7, 'days');
    // 3.3 Jahr und Wochennummer
    $('.thisweek').html(date.week());
    $('.thisyear').html(date.year());
    fillTafel();
});

//Wenn Buton nach rechts gedrückt wird (nächste Kalenderwoche)
$('#plusone').on("click", function() {
    date.add(7, 'days');
    // 3.3 Jahr und Wochennummer
    $('.thisweek').html(date.week());
    $('.thisyear').html(date.year());
    fillTafel();
});

//Array für die Anzeige der Wochentage
const weekday = new Array(7);
weekday[0] = "Sonntag";
weekday[1] = "Montag";
weekday[2] = "Dienstag";
weekday[3] = "Mittwoch";
weekday[4] = "Donnerstag";
weekday[5] = "Freitag";
weekday[6] = "Samstag";
