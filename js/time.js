//Kalenderwoche + Jahr
var today = moment().week() + "-" + moment().year();

//Array für die Anzeige der Wochentage
const weekday = new Array(7);
weekday[0] = "Sonntag";
weekday[1] = "Montag";
weekday[2] = "Dienstag";
weekday[3] = "Mittwoch";
weekday[4] = "Donnerstag";
weekday[5] = "Freitag";
weekday[6] = "Samstag";
