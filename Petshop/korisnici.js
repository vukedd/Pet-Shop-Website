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

// Funkcija uz pomoc koje cemo izvuci sve korisnike iz json file-a.
function GetKorisnici() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {

                // JSON file pretvaramo u Javascript array
                korisnici = JSON.parse(request.responseText);
                
                
                // Izvrsavamo iteraciju kroz sve korisnike u /korisnici.json //
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


// funkcija koja predstavlja put request za slanje izmena na odgovarajudi id.
function updateKorisnik() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Uspesno ste dodali korisnika.");
            } else {
                alert("Greska prilikom azuriranja korisnika");
            }
        }
    };

    request.open("PUT", FirebaseURL + "/korisnici/" + korisnikId +".json");
    request.send(JSON.stringify(editKorisnik));
}

// pokusaj da pokupim elemente iz input polja i ubacim u objekat koji cu zatim poslati.

let editForm = document.getElementById("editModal");
editForm.addEventListener("submit", function(event){
    event.preventDefault();

    var editovanadresa = document.querySelector("#adresaedit").value;
    if (editovanadresa != "") {
        window.editKorisnik.adresa = editovanadresa;
    }

    var editovandatum = document.querySelector("#datepickeredit").value;
    if (editovandatum != "") {
        window.editKorisnik.datumRodjenja = editovandatum;
    }

    var editovanemail = document.querySelector("#emailedit").value;
    if (editovanemail != "") {
        window.editKorisnik.email = editovanemail;
    }

    var editovanoime = document.querySelector("#imedit").value;
    if (editovanoime != ""){
        window.editKorisnik.ime = editovanoime;
    }

    var editUN = document.querySelector("#unedit").value;
    if (editUN != "") {
        window.editKorisnik.korisnickoIme = editUN;
    }

    var editlozinka = document.querySelector("#passwordedit").value;
    if (editlozinka != "") {
        window.editKorisnik.lozinka = editlozinka;
    }  

    var editprezime = document.querySelector("#prezimedit").value;
    if (editprezime != "") {
        window.editKorisnik.prezime = editprezime;
    }

    var edittelefon = document.querySelector("#telefonedit").value;
    if (edittelefon != "") {
        window.editKorisnik.telefon = edittelefon;
    }
});


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
        var izmenjenBrTel = document.getElementById("telefonedit").value = korisnik.telefon;
        var izmenjenDatum = document.getElementById("datepickeredit").value = korisnik.datumRodjenja;
        
        window.editKorisnik.ime = izmenjenoIme;

        console.log(editKorisnik.ime);  
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
    let kanta = document.createElement("i");
    kanta.setAttribute("class","bi bi-trash3-fill");
    novaKanta.appendChild(kanta);
    deleteTd.appendChild(novaKanta);
    KorisniciRed.appendChild(deleteTd);

    document.getElementById(tBody).appendChild(KorisniciRed);
} 
