let slika = document.querySelector("#onamapic");
let godOtvaranja = document.querySelector("#godinaOtvaranja");
let adresaPS = document.querySelector("#adresaShop");

informacije = {};

let request = new XMLHttpRequest();

request.onreadystatechange = function () {
    if (this.readyState == 4){
        if (this.status == 200){
            informacije = JSON.parse(this.responseText);
            
            godOtvaranja.innerHTML = informacije.godinaOtvaranja;
            adresaPS.innerHTML = informacije.adresa;

            var logo = informacije.logo;
            slika.setAttribute("src", logo);
            console.log(slika);
            slika.style.width="20%";
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

    let logoIzmena = document.querySelector("#logoPS");
    logoIzmena.setAttribute("value", informacije.logo);
})

let potvrdiIzmene = document.querySelector("#izmeniDetalje");
potvrdiIzmene.addEventListener("click", function(event){
    event.preventDefault();

    let imePotvrdi = document.querySelector("#imePS").value;
    let nazivEditValidation = document.querySelector("#nazivEditValidation");
    if (imePotvrdi == "") {
        informacije.naziv = "";
        nazivEditValidation.innerHTML = " Morate popuniti ovo polje";
        nazivEditValidation.style.color = "red";
    }
    else {
        informacije.naziv = imePotvrdi;
        nazivEditValidation.innerHTML = "";
    }

    let godinaPotvrdi = document.querySelector("#godOtvaranja").value;
    let godinaEditValidation = document.querySelector("#godinaEditValidation");
    if (godinaPotvrdi == "") {
        informacije.godinaOtvaranja = "";
        godinaEditValidation.innerHTML = " Morate popuniti ovo polje";
        godinaEditValidation.style.color = "red";
    }
    else if(!/^\d{4}$/.test(godinaPotvrdi)){
        informacije.godinaOtvaranja = "";
        godinaEditValidation.innerHTML = " Format za unos: yyyy";
        godinaEditValidation.style.color = "red"
    }
    else {
        informacije.godinaOtvaranja = godinaPotvrdi;
        nazivEditValidation.innerHTML = "";
    }

    let adresaPotvrdi = document.querySelector("#adresaPS").value;
    let adresaEditValidation = document.querySelector("#adresaEditValidation");
    if (adresaPotvrdi == ""){
        informacije.adresa = "";
        adresaEditValidation.innerText = "Neophodno je popuniti ovo polje";
        adresaEditValidation.style.color = "red";
    }
    else if (adresaPotvrdi.length < 10) {
        informacije.adresa = "";
        adresaEditValidation.innerText = "Format za unos: Adresa, Grad, Poštanski br."
        adresaEditValidation.style.color = "red";
    }
    else if (!/\b\d{5}\b/g.test(adresaPotvrdi)){
        informacije.adresa = "";
        adresaEditValidation.innerText = "Neophodno je uneti poštanski broj."
        adresaEditValidation.style.color = "red";
    }
    else {
        adresaEditValidation.innerText = "";
        informacije.adresa = adresaPotvrdi.trim();
    }

    let brojtelPotvrdi = document.querySelector("#telepunPS").value;
    let telefonEditValidation = document.querySelector("#telefonEditValidation");
    if (brojtelPotvrdi == ""){
        informacije.telefon = "";
        telefonEditValidation.innerText = "Neophodno je popuniti ovo polje";
        telefonEditValidation.style.color = "red";
    }
    else if (!/^06\d-[0-9]{3,4}-[0-9]{3}$/.test(brojtelPotvrdi)){
        informacije.telefon = "";
        telefonEditValidation.innerText = "Format za unos: 06x-xxx(x)-xxx";
        telefonEditValidation.style.color = "red";
    }
    else {
        telefonEditValidation.innerText = "";
        informacije.telefon = brojtelPotvrdi.trim();
    }

    let logoPotvrdi = document.querySelector("#logoPS").value;
    let logoEditValidation = document.querySelector("#logoEditValidation")
    if (logoPotvrdi == ""){
        informacije.logo = "";
        logoEditValidation.innerHTML = "Neophodno je popuniti ovo polje";
        logoEditValidation.style.color = 'red'; 
    }
    else {
        informacije.logo = logoPotvrdi;
        logoEditValidation = "";
    }
    
    let PotvrdiReq = new XMLHttpRequest();

    if (informacije.naziv != "" && informacije.godinaOtvaranja != "" && informacije.adresa != "" && informacije.telefon != "" && informacije.logo != ""){
        PotvrdiReq.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    location.reload();
                } else {
                    alert("Greska prilikom azuriranja detalja Pet Shop-a");
                }
            }
        };
    
        PotvrdiReq.open("PUT", FirebaseURL + "/petShop.json");
        PotvrdiReq.send(JSON.stringify(informacije));
    }

});