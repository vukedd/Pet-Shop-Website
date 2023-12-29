let ime = document.querySelectorAll(".naziv");
let slika = document.querySelector("#onamapic");
let informacije = {};


let request = new XMLHttpRequest();

request.onreadystatechange = function () {
    if (this.readyState == 4){
        if (this.status == 200){
            informacije = JSON.parse(this.responseText);
            console.log(ime)
            for (var span in ime){
                ime[span].innerHTML = informacije.naziv;
            }
            var logo = informacije.logo;
            
        }
    }
}
request.open("GET", FirebaseURL + "/petShop.json");
request.send();