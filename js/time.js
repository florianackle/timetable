//Kalenderwoche + Jahr
var today = moment().week() + "-" + moment().year();
var weekday = "";

function setDay() {
    switch (day) {
        case 0:
                weekday = "Sonntag";
                break;

        case 1:
                weekday = "Montag";
                break;

        case 2:
                weekday = "Dienstag";
                break;

        case 3:
                weekday = "Mittwoch";
                break;

        case 4:
                weekday = "Donnerstag";
                break;

        case 5:
                weekday = "Freitag";
                break;

        case 6:
                weekday = "Samstag";
    }
}
