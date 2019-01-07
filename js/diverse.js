// Beim Hovern --> tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// Alert Nachrichten, sollte die AJAX Abfrage nicht möglich sein bzw. fehlschlagen
// Individuelle Nachricht für Berufsgruppen, Klassen und Tafel
function alert() {
    // Fehlermeldung falls bei der Berufsgruppe etwas nicht geladen werden konnte
    if (alertmsg == 1) {
        swal({
                title: "Beim Laden der Berufsgruppen ist etwas schief gegangen...!",
                text: "Wollen Sie die Seite erneut laden?",
                icon: "error",
                buttons: true
            })
            .then((refresh) => {
                // Abfrage ob die Seite neu geladen werden soll oder nicht
                if (refresh) {
                    location.reload();
                } else {
                    swal({
                        title: "Bitte informieren Sie den Administrator oder laden Sie die Seite neu",
                        text: "Drücken Sie die Taste 'F5' um die Seite neu zu laden.",
                        icon: "warning"
                    })
                }
            })
    }
    // Fehlermeldung falls bei der Klasse etwas nicht geladen werden konnte
    else if (alertmsg == 2) {
        swal({
                title: "Beim Laden der Klassen ist etwas schief gegangen...!",
                text: "Wollen Sie die Seite erneut laden?",
                icon: "error",
                buttons: true
            })
            .then((refresh) => {
                // Abfrage ob die Seite neu geladen werden soll oder nicht
                if (refresh) {
                    location.reload();
                } else {
                    swal({
                        title: "Bitte informieren Sie den Administrator oder laden Sie die Seite neu",
                        text: "Drücken Sie die Taste 'F5' um die Seite neu zu laden.",
                        icon: "warning"
                    })
                }
            })
    }
    // Fehlermeldung falls bei der Tafel etwas nicht geladen werden konnte
    else if (alertmsg == 3) {
        swal({
                title: "Beim Laden der Tafel ist etwas schief gegangen...!",
                text: "Wollen Sie die Seite erneut laden?",
                icon: "error",
                buttons: true
            })
            .then((refresh) => {
                // Abfrage ob die Seite neu geladen werden soll oder nicht
                if (refresh) {
                    location.reload();
                } else {
                    swal({
                        title: "Bitte informieren Sie den Administrator oder laden Sie die Seite neu",
                        text: "Drücken Sie die Taste 'F5' um die Seite neu zu laden.",
                        icon: "warning"
                    })
                }
            })
    }
}
