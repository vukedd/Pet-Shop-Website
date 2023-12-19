// Promenljiva u kojoj se nalazi Firebase sa json fileom.
let FirebaseURL = "https://pet-shop-fff9d-default-rtdb.europe-west1.firebasedatabase.app";

// Promenljiva u koju cemo dodati sve elemente iz jsona.
let korisnici = {};

// Ovde cu nakon svake iteracije sacuvati id korisnika.
var trenutno;

GetKorisnici();

// Funkcija uz pomoc koje cemo izvuci sve korisnike iz json file-a.
function GetKorisnici() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Ukloni stari Tbody kako se ne bi ponavljali korisnici nakon svakog refresha.

                // JSON file pretvaramo u Javascript array
                korisnici = JSON.parse(request.responseText);

                // Izvrsavamo iteraciju kroz sve korisnike u /korisnici.json //
                for (var id in korisnici) {
                    let korisnik = korisnici[id];
                    trenutno = id;
                    appendKorisniciRed("korisnicitbod", korisnik);
                }
            } else {
                alert("Greska prilikom ucitavanja korisnika.");
            }
        }
    };

    request.open("GET", FirebaseURL + "/korisnici.json");
    request.send();
}




// ---------- POMOCNE FUNKCIJE ------------- //
function removeTableRows(tBodyId) {
    let tBody = document.getElementById(tBodyId);
    while (tBody.firstChild) {
      tBody.removeChild(tBody.lastChild);
    }
  }

function appendKorisniciRed(tBody, korisnik) {
    let KorisniciRed = document.createElement("tr");

    let UserTd = document.createElement("td");
    UserTd.innerText = korisnik.korisnickoIme;
    KorisniciRed.appendChild(UserTd);

    let pwTd = document.createElement("td");
    pwTd.innerText = korisnik.lozinka;
    KorisniciRed.appendChild(pwTd);

    let emailTd = document.createElement("td");
    emailTd.innerText = korisnik.email;
    KorisniciRed.appendChild(emailTd);

    let imeTd = document.createElement("td");
    imeTd.innerText = korisnik.ime;
    KorisniciRed.appendChild(imeTd);

    let prezimeTd = document.createElement("td");
    prezimeTd.innerText = korisnik.prezime;
    KorisniciRed.appendChild(prezimeTd);

    let DatumRodTd = document.createElement("td");
    DatumRodTd.innerText = korisnik.datumRodjenja;
    KorisniciRed.appendChild(DatumRodTd);

    let adresaTd = document.createElement("td");
    adresaTd.innerText = korisnik.adresa;
    KorisniciRed.appendChild(adresaTd);

    let TelefonTd = document.createElement("td");
    TelefonTd.innerText = korisnik.telefon;
    KorisniciRed.appendChild(TelefonTd);

    // olovka
    let editTd = document.createElement("td");
    editTd.style.paddingLeft = "5px"
    // link u kom se nalazi ikonica olovka
    let novaOlovka = document.createElement("a");
    novaOlovka.setAttribute("id", "izmeniTabla");
    novaOlovka.setAttribute("href", "#")
    novaOlovka.setAttribute("data-toggle", "modal");
    novaOlovka.setAttribute("data-target", "#exampleModalCenter2");
    novaOlovka.setAttribute("data-dismiss", "modal")
    novaOlovka.addEventListener("click", () => {
        console.log("Hello world", korisnik)
    })
    // ikonica olovke 
    let olovka = document.createElement("i");
    olovka.setAttribute("class", "bi bi-pencil-fill");
    // ikonicu dodajem u link
    novaOlovka.appendChild(olovka);
    // link dodajem u tD.
    editTd.appendChild(novaOlovka);
    // 
    KorisniciRed.appendChild(editTd);

    // kanta
    let deleteTd = document.createElement("td");
    deleteTd.style.paddingLeft = "5px"
    let novaKanta = document.createElement("a");
    novaKanta.setAttribute("id", "ukloniTabla");
    novaKanta.setAttribute("href", "#");
    let kanta = document.createElement("i");
    kanta.setAttribute("class","bi bi-trash3-fill");
    novaKanta.appendChild(kanta);
    deleteTd.appendChild(novaKanta);
    KorisniciRed.appendChild(deleteTd);

    document.getElementById(tBody).appendChild(KorisniciRed);
} 
