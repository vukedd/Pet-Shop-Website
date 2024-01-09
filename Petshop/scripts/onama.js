
let ime = document.querySelectorAll(".naziv");
let slika = document.querySelector("#onamapic");
let godOtvaranja = document.querySelector("#godinaOtvaranja");
let telefonPS = document.querySelectorAll(".telefonPS");
let adresaPS = document.querySelector("#adresaShop");


let informacije = {};

let request = new XMLHttpRequest();

request.onreadystatechange = function () {
    if (this.readyState == 4){
        if (this.status == 200){
            informacije = JSON.parse(this.responseText);
            for (var span in ime){
                ime[span].innerHTML = informacije.naziv;
            }
            
            for (var span in telefonPS){
                telefonPS[span].innerHTML = informacije.telefon;
            }
            
            godOtvaranja.innerHTML = informacije.godinaOtvaranja;
            adresaPS.innerHTML = informacije.adresa;

            // var logo = informacije.logo;
            // slika.setAttribute("src", logo);
            // console.log(slika);
            // slika.style.width="20%";
        }
    }
}
request.open("GET", FirebaseURL + "/petShop.json");
request.send();


let editPS = document.querySelector("#izmeniPS");
editPS.addEventListener("click", () => {
    let imeIzmena = document.querySelector("#imePS");
    imeIzmena.setAttribute("value", informacije.naziv);

    let godinaIzmena = document.querySelector("#godOtvaranja");
    godinaIzmena.setAttribute("value", informacije.godinaOtvaranja);

    let adresaIzmena = document.querySelector("#adresaPS");
    adresaIzmena.setAttribute("value", informacije.adresa);

    let brojtelIzmena = document.querySelector("#telepunPS");
    brojtelIzmena.setAttribute("value", informacije.telefon);
})

function izmenaDetalja(){
    let imePotvrdi = document.querySelector("#imePS").value;
    informacije.naziv = imePotvrdi;

    let godinaPotvrdi = document.querySelector("#godOtvaranja").value;
    informacije.godinaOtvaranja = godinaPotvrdi;

    let adresaPotvrdi = document.querySelector("#adresaPS").value;
    informacije.adresa = adresaPotvrdi;

    let brojtelPotvrdi = document.querySelector("#telepunPS").value;
    informacije.telefon = brojtelPotvrdi;
    
    let PotvrdiReq = new XMLHttpRequest();

    PotvrdiReq.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Uspesno Azurirani detalji Pet Shop-a.");
            } else {
                alert("Greska prilikom azuriranja detalja Pet Shop-a");
            }
        }
    };

    PotvrdiReq.open("PUT", FirebaseURL + "/petShop.json");
    PotvrdiReq.send(JSON.stringify(informacije));

}