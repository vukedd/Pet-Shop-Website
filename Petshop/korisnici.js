// Promenljiva u kojoj se nalazi Firebase sa json fileom.
let FirebaseURL = "https://pet-shop-fff9d-default-rtdb.europe-west1.firebasedatabase.app";


// Promenljiva u koju cemo dodati sve elemente iz jsona.
let korisnici = {};


// objekat koji cemo da iskoristimo da posaljemo put request u bazu podataka.
var editKorisnik = {
    adresa: "", datumRodjenja: "", email: "", ime: "", korisnickoIme: "", lozinka: "", prezime: "", telefon: ""
}


// id korisnika.
var korisnikId;

GetKorisnici();

// Registracija korisnika
const formRegister = document.querySelector("#register1"); 
formRegister.addEventListener('submit', event => {

    const podaciForma = new FormData(formRegister);
    const noviKorisnik = Object.fromEntries(podaciForma);
    console.log(noviKorisnik);
    const korisnikSlanje = JSON.stringify(noviKorisnik);

    let registerReq = new XMLHttpRequest();
    registerReq.onreadystatechange = function() {
        if (this.readyState == 4){
            if (this.status == 200){
                console.log("Uspesno ste se registrovali.")
            }
            else {
                alert("Greska prilikom registracije korisnika");
            }
        }
    }
    registerReq.open("POST", FirebaseURL + "/korisnici.json");
    registerReq.send(korisnikSlanje);
})



// Funkcija uz pomoc koje cemo izvuci sve korisnike iz json file-a.
function GetKorisnici() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {

                korisnici = JSON.parse(request.responseText);
                
                for (var id in korisnici) {
                    let korisnik = korisnici[id];
                    appendKorisniciRed("korisnicitbod", korisnik, id);
                }   
            } else {
                alert("Greska prilikom ucitavanja korisnika.");
            }
        }
    };

    request.open("GET", FirebaseURL + "/korisnici.json");
    request.send();
}



// funkcija za potvrdjivanje izmena o korisniku, fali validacija podataka.
function updateKorisnik() {

    var editovanoIme = document.querySelector("#imedit").value;
    editKorisnik.ime = editovanoIme;

    var editovanoPrezime = document.querySelector("#prezimedit").value;
    editKorisnik.prezime = editovanoPrezime;

    var editovanUN = document.querySelector("#unedit").value;
    editKorisnik.korisnickoIme = editovanUN;

    var editovanDatum = document.querySelector("#datepickeredit").value;
    editKorisnik.datumRodjenja = editovanDatum;

    var editovanaLozinka = document.querySelector("#passwordedit").value;
    editKorisnik.lozinka = editovanaLozinka;

    var editovanaAdresa = document.querySelector("#adresaedit").value;
    editKorisnik.adresa = editovanaAdresa;

    var editovanEmail = document.querySelector("#emailedit").value;
    editKorisnik.email = editovanEmail;

    var editovanBroj = document.querySelector("#telefonEdit").value;
    editKorisnik.telefon = editovanBroj;

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {          
                alert("Uspesno Azuriran korisnik.");
            } else {
                alert("Greska prilikom azuriranja korisnika");
            }
        }
    };

    request.open("PUT", FirebaseURL + "/korisnici/" + korisnikId + ".json");
    request.send(JSON.stringify(editKorisnik));
}


// ---------- POMOCNE FUNKCIJE ------------- //
function appendKorisniciRed(tBody, korisnik, id) {
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
    editTd.style.paddingLeft = "5px";
    // link u kom se nalazi ikonica olovka
    let novaOlovka = document.createElement("a");
    novaOlovka.setAttribute("id", "izmeniTabla");
    novaOlovka.setAttribute("href", "#")
    novaOlovka.setAttribute("data-toggle", "modal");
    novaOlovka.setAttribute("data-target", "#exampleModalCenter2");
    novaOlovka.setAttribute("data-dismiss", "modal")
    novaOlovka.addEventListener("click", () => {
        window.korisnikId = id;
        var izmenjenoIme = document.getElementById("imedit").value = korisnik.ime;
        var izmenjenoPrezime = document.getElementById("prezimedit").value = korisnik.prezime;
        var izmenjenUN = document.getElementById("unedit").value = korisnik.korisnickoIme;
        var izmenjenaAdresa = document.getElementById("adresaedit").value = korisnik.adresa;
        var izmenjenEmail = document.getElementById("emailedit").value = korisnik.email;
        var izmenjenaLozinka = document.getElementById("passwordedit").value = korisnik.lozinka;
        var izmenjenBrTel = document.getElementById("telefonEdit").value = korisnik.telefon;
        var izmenjenDatum = document.getElementById("datepickeredit").value = korisnik.datumRodjenja;
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
    deleteTd.style.paddingLeft = "5px";
    let novaKanta = document.createElement("a");
    novaKanta.setAttribute("id", "ukloniTabla");
    novaKanta.setAttribute("href", "#");
    novaKanta.addEventListener("click", () => {
        var result = confirm("Da li ste sigurni da zelite da obrisete korisnika?")
        if (result) {
            korisnikId = id;
            let DelRequest = new XMLHttpRequest();
    
            DelRequest.onreadystatechange = function (e) {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        location.reload();
                    }
                    else {
                        alert("Greska pri brisanju korisnika iz sistema.");
                    }
                }
            };
            DelRequest.open("DELETE", FirebaseURL + "/korisnici/" + korisnikId + ".json");
            DelRequest.send();
        }

    })
    let kanta = document.createElement("i");
    kanta.setAttribute("class","bi bi-trash3-fill");
    novaKanta.appendChild(kanta);
    deleteTd.appendChild(novaKanta);
    KorisniciRed.appendChild(deleteTd);

    document.getElementById(tBody).appendChild(KorisniciRed);
} 
