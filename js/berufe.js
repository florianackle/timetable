var xhttp = new XMLHttpRequest();


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 299) {
        document.getElementById("").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "http://sandbox.gibm.ch/berufe.php", true);
xhttp.send();

console.log(xhttp);
