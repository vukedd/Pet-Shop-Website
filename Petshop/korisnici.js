// Promenljiva u kojoj se nalazi Firebase sa json fileom.
let FirebaseURL = "https://pet-shop-fff9d-default-rtdb.europe-west1.firebasedatabase.app";

// Promenljiva u koju cemo dodati sve elemente iz jsona.
let korisnici = {};

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

                // Izvrsavaom iteraciju kroz sve korisnike u /korisnici.json //
                for (let id in korisnici) {
                    let korisnik = korisnici[id];
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

    let editTd = document.createElement("td");
    editTd.style.paddingLeft = "5px"
    editTd.innerHTML = 
    '<a href="#" id="izmenatabla"><i class="bi bi-pencil-fill"></i></a>'
    KorisniciRed.appendChild(editTd);

    let deleteTd = document.createElement("td");
    deleteTd.style.paddingLeft = "5px"
    deleteTd.innerHTML = 
    '<a onclick="ukloniKorisnika()" id="uklonitabla"><i class="bi bi-trash3-fill"></i></a>'
    KorisniciRed.appendChild(deleteTd);

    document.getElementById(tBody).appendChild(KorisniciRed);
}

function ukloniKorisnika() {

}