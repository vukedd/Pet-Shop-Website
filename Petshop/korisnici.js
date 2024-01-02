// Promenljiva u kojoj se nalazi Firebase sa json fileom.
let FirebaseURL = "https://pet-shop-fff9d-default-rtdb.europe-west1.firebasedatabase.app";


// Promenljiva u koju cemo dodati sve elemente iz jsona.
let korisnici = {};


// objekat koji cemo da iskoristimo da posaljemo put request u bazu podataka.
var editKorisnik = {
    adresa: "", datumRodjenja: "", email: "", ime: "", korisnickoIme: "", lozinka: "", prezime: "", telefon: ""
}

// P
var popuniProfil = {
    ime: "", prezime: "", datumRodjenja: "", adresa: "", telefon: "", email: "", lozinka: ""
}

var noviKorisnik = {
    adresa: "", datumRodjenja: "", email: "", ime: "", korisnickoIme: "", lozinka: "", prezime: "", telefon: ""
}


// id korisnika.
var korisnikId;

GetKorisnici();

// Registracija korisnika sa valiacijom podataka.
const formRegister = document.querySelector("#register1"); 
formRegister.addEventListener('submit', event => {

    event.preventDefault();

    // Validacija za ime
    let imereg = document.querySelector("#imereg").value;
    let errorime = document.querySelector("#errorime");
    if (imereg == ""){
        errorime.innerText = "Neophodno je popuniti ovo polje";
        errorime.style.color = "red";
    }
    else if (/\d/.test(imereg)) {
        errorime.innerText = "Ime ne sme da sadrži brojeve.";
        errorime.style.color = "red";
    }
    else {
        errorime.innerText = "";
        noviKorisnik.ime = imereg.trim();
    }

    // Validacija za prezime
    let prezimereg = document.querySelector("#prezime").value;
    let errorprezime = document.querySelector("#errorprezime");
    if (prezimereg == ""){
        errorprezime.innerText = "Neophodno je popuniti ovo polje";
        errorprezime.style.color = "red";
    }
    else if (/\d/.test(prezimereg)) {
        errorprezime.innerText = "Ime ne sme da sadrži brojeve.";
        errorprezime.style.color = "red";
    }
    else {
        errorprezime.innerText = "";
        noviKorisnik.prezime = prezimereg.trim();
    }

    // Validacija za username
    let unreg = document.querySelector("#un").value;
    let errorun = document.querySelector("#errorun");
    if (unreg == ""){
        errorun.innerText = "Neophodno je popuniti ovo polje";
        errorun.style.color = "red";
    }
    else {
        errorun.innerText = "";
        noviKorisnik.korisnickoIme = unreg.trim();
    }
    console.log(noviKorisnik);

    // Validacija za adresu
    let adresareg = document.querySelector("#adresaa").value;
    let erroradresa = document.querySelector("#erroradresa");
    if (adresareg == ""){
        erroradresa.innerText = "Neophodno je popuniti ovo polje";
        erroradresa.style.color = "red";
    }
    else if (adresareg.length < 10) {
        erroradresa.innerText = "Format za unos: Adresa, Grad, Poštanski br."
        erroradresa.style.color = "red";
    }
    else if (!/\b\d{5}\b/g.test(adresareg)){
        erroradresa.innerText = "Neophodno je uneti poštanski broj."
        erroradresa.style.color = "red";
    }
    else {
        erroradresa.innerText = "";
        noviKorisnik.adresa = adresareg.trim();
    }
    console.log(noviKorisnik);

    // Validacija za email
    let emailreg = document.querySelector("#email1").value;
    let erroremail = document.querySelector("#erroremail");
    if (emailreg == ""){
        erroremail.innerText = "Neophodno je popuniti ovo polje";
        erroremail.style.color = "red";
    }
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailreg)){
        erroremail.innerText = "Unesite važeću email adresu";
        erroremail.style.color = "red";
    }
    else {
        erroremail.innerText = "";
        noviKorisnik.email = emailreg.trim();
        console.log(noviKorisnik);
    }
    
    // Validacija za sifru
    let sifrareg = document.querySelector("#password1").value;
    let errorsifra = document.querySelector("#errorpw");
    if (sifrareg == ""){
        errorsifra.innerText = "Neophodno je popuniti ovo polje";
        errorsifra.style.color = "red";
    }
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(sifrareg)){
        errorsifra.innerText = "Lozinka mora biti minimum 8 karaktera i da sadrži bar jedan broj";
        errorsifra.style.color = "red";
    }
    else {
        errorsifra.innerText = "";
        noviKorisnik.lozinka = sifrareg.trim();
        console.log(noviKorisnik);
    }

    //Validacija za broj telefona
    let telreg = document.querySelector("#telepun").value;
    let errortel = document.querySelector("#errortel");
    if (telreg == ""){
        errortel.innerText = "Neophodno je popuniti ovo polje";
        errortel.style.color = "red";
    }
    else if (!/^\d{3}-\d{3}-\d{4}$|^\d{3}-\d{3}-\d{3}$/.test(telreg)){
        errortel.innerText = "Format za unos: xxx-xxx-xxx ili xxx-xxx-xxxx";
        errortel.style.color = "red";
    }
    else {
        errortel.innerText = "";
        noviKorisnik.telefon = telreg.trim();
        console.log(noviKorisnik);
    }
    
    // Validacija za datum
    let datereg = document.querySelector("#datepicker").value;
    let errordate = document.querySelector("#errordate");
    if (!/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d{2}$/){
        errordate.innerText = "Neophodno je popuniti ovo polje."
        errordate.style.color = "red";
    }
    else {
        errordate.innerHTML = "";
        noviKorisnik.datumRodjenja = datereg.trim();
        console.log(noviKorisnik);
    }
    let korisnikSlanje = JSON.stringify(noviKorisnik);
    if (noviKorisnik.ime != "" && noviKorisnik.prezime != "" && noviKorisnik.korisnickoIme != "" && noviKorisnik.adresa != "" && noviKorisnik.lozinka != "" && noviKorisnik.telefon != "" && noviKorisnik.datumRodjenja != "" && noviKorisnik.email != ""){
        let registerReq = new XMLHttpRequest();
        registerReq.onreadystatechange = function() {
        if (this.readyState == 4){
            if (this.status == 200){
                console.log("Uspesno ste se registrovali.")
                location.reload();
            }
            else {
                alert("Greska prilikom registracije korisnika");
            }
        }
    }
    registerReq.open("POST", FirebaseURL + "/korisnici.json");
    registerReq.send(korisnikSlanje);
    } 

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

// Funkcija koja validira podatke za izmenu korisnika i salje u firebase.
const formEdit = document.querySelector(".editModal"); 
formEdit.addEventListener('submit', event => {

    event.preventDefault();

    // Validacija za ime
    let imereg1 = document.querySelector("#imedit").value;
    let errorime1 = document.querySelector("#errorime1");
    if (imereg1 == ""){
        errorime1.innerText = "Neophodno je popuniti ovo polje";
        errorime1.style.color = "red";
    }
    else if (/\d/.test(imereg1)) {
        errorime1.innerText = "Ime ne sme da sadrži brojeve.";
        errorime1.style.color = "red";
    }
    else {
        errorime1.innerText = "";
        editKorisnik.ime = imereg1.trim();
    }

    // Validacija za prezime
    let prezimereg1 = document.querySelector("#prezimedit").value;
    let errorprezime1 = document.querySelector("#errorprezime1");
    if (prezimereg1 == ""){
        errorprezime1.innerText = "Neophodno je popuniti ovo polje";
        errorprezime1.style.color = "red";
    }
    else if (/\d/.test(prezimereg1)) {
        errorprezime1.innerText = "Ime ne sme da sadrži brojeve.";
        errorprezime1.style.color = "red";
    }
    else {
        errorprezime1.innerText = "";
        editKorisnik.prezime = prezimereg1.trim();
    }

    // Validacija za username
    let unreg1 = document.querySelector("#unedit").value;
    let errorun1 = document.querySelector("#errorun1");
    if (unreg1 == ""){
        errorun1.innerText = "Neophodno je popuniti ovo polje";
        errorun1.style.color = "red";
    }
    else {
        errorun1.innerText = "";
        editKorisnik.korisnickoIme = unreg1.trim();
    }

    // Validacija za adresu
    let adresareg1 = document.querySelector("#adresaedit").value;
    let erroradresa1 = document.querySelector("#erroradresa1");
    if (adresareg1 == ""){
        erroradresa1.innerText = "Neophodno je popuniti ovo polje";
        erroradresa1.style.color = "red";
    }
    else if (adresareg1.length < 10) {
        erroradresa1.innerText = "Format za unos: Adresa, Grad, Poštanski br."
        erroradresa1.style.color = "red";
    }
    else if (!/\b\d{5}\b/g.test(adresareg1)){
        erroradresa1.innerText = "Neophodno je uneti poštanski broj."
        erroradresa1.style.color = "red";
    }
    else {
        erroradresa1.innerText = "";
        editKorisnik.adresa = adresareg1.trim();
    }

    // Validacija za email
    let emailreg1 = document.querySelector("#emailedit").value;
    let erroremail1 = document.querySelector("#erroremail1");
    if (emailreg1 == ""){
        erroremail1.innerText = "Neophodno je popuniti ovo polje";
        erroremail1.style.color = "red";
    }
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailreg1)){
        erroremail1.innerText = "Unesite važeću email adresu";
        erroremail1.style.color = "red";
    }
    else {
        erroremail1.innerText = "";
        editKorisnik.email = emailreg1.trim();
    }
    
    // Validacija za sifru
    let sifrareg1 = document.querySelector("#passwordedit").value;
    let errorsifra1 = document.querySelector("#errorpw1");
    if (sifrareg1 == ""){
        errorsifra1.innerText = "Neophodno je popuniti ovo polje";
        errorsifra1.style.color = "red";
    }
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(sifrareg1)){
        errorsifra1.innerText = "Lozinka mora biti minimum 8 karaktera i da sadrži bar jedan broj";
        errorsifra1.style.color = "red";
    }
    else {
        errorsifra1.innerText = "";
        editKorisnik.lozinka = sifrareg1.trim();
    }

    //Validacija za broj telefona
    let telreg1 = document.querySelector("#telefonEdit").value;
    let errortel1 = document.querySelector("#errortel1");
    if (telreg1 == ""){
        errortel1.innerText = "Neophodno je popuniti ovo polje";
        errortel1.style.color = "red";
    }
    else if (!/^\d{3}-\d{3}-\d{4}$|^\d{3}-\d{3}-\d{3}$/.test(telreg1)){
        errortel1.innerText = "Format za unos: xxx-xxx-xxx ili xxx-xxx-xxxx";
        errortel1.style.color = "red";
    }
    else {
        errortel1.innerText = "";
        editKorisnik.telefon = telreg1.trim();
    }
    
    // Validacija za datum
    let datereg1 = document.querySelector("#datepickeredit").value;
    let errordate1 = document.querySelector("#errordate1");
    if (datereg1.length < 7){
        errordate1.innerText = "Neophodno je popuniti ovo polje."
        errordate1.style.color = "red";
    }
    else {
        errordate1.innerHTML = "";
        editKorisnik.datumRodjenja = datereg1.trim();
    }

    console.log(editKorisnik);

    if (editKorisnik.ime != "" && editKorisnik.prezime != "" && editKorisnik.korisnickoIme != "" && editKorisnik.adresa != "" && editKorisnik.lozinka != "" && editKorisnik.telefon != "" && editKorisnik.datumRodjenja != "" && editKorisnik.email != ""){
        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {          
                    alert("Uspesno Azuriran korisnik.");
                    location.reload();
                } else {
                    alert("Greska prilikom azuriranja korisnika");
                }
            }
        };

    request.open("PUT", FirebaseURL + "/korisnici/" + korisnikId + ".json");
    request.send(JSON.stringify(editKorisnik));
    } 

})

// Funkcija koja popunjava formu za izmenu korisnika prilikom klika.
function izmenaPopuni(){
    let imeprofila = document.querySelector("#imeprofil");
    imeprofila.innerHTML = popuniProfil.ime;

    let prezimeprofila = document.querySelector("#prezimeprofil");
    prezimeprofila.innerHTML = popuniProfil.prezime;

    let datumprofila = document.querySelector("#datumprofil");
    datumprofila.innerHTML = popuniProfil.datumRodjenja;

    let adresaprofila = document.querySelector("#adresaprofil");
    adresaprofila.innerHTML = popuniProfil.adresa;

    let brojprofila = document.querySelector("#telefonprofil");
    brojprofila.innerHTML = popuniProfil.telefon;

    let emailprofil = document.querySelector("#emailprofil");
    emailprofil.innerHTML = popuniProfil.email;

    let lozinkaprofil = document.querySelector("#lozinkaprofil");
    lozinkaprofil.innerHTML = popuniProfil.lozinka;

    let KorisnickoImeprofil = document.querySelector("#usernamehead");
    KorisnickoImeprofil.innerHTML = `${popuniProfil.korisnickoIme}`;
}


// ---------- POMOCNE FUNKCIJE ------------- //
function appendKorisniciRed(tBody, korisnik, id) {
    let KorisniciRed = document.createElement("tr");

    let UserTd = document.createElement("td");
    UserTd.innerHTML = `<a href="#" style="text-decoration: underline; color: black; font-size: 18px; id="klikniprofil">${korisnik.korisnickoIme}</a>`;
    UserTd.setAttribute("data-toggle", "modal");
    UserTd.setAttribute("data-target", "#exampleModalCenter3");
    UserTd.setAttribute("data-dismiss", "modal")
    UserTd.addEventListener("click", () => {
        window.korisnikId = id;
        popuniProfil.korisnickoIme = korisnik.korisnickoIme;
        popuniProfil.ime = korisnik.ime;
        popuniProfil.prezime = korisnik.prezime;
        popuniProfil.datumRodjenja = korisnik.datumRodjenja;
        popuniProfil.adresa = korisnik.adresa;
        popuniProfil.telefon = korisnik.telefon;
        popuniProfil.email = korisnik.email;
        popuniProfil.lozinka = korisnik.lozinka;
        izmenaPopuni();
    })
    KorisniciRed.appendChild(UserTd);

    let emailTd = document.createElement("td");
    emailTd.innerText = korisnik.email;
    KorisniciRed.appendChild(emailTd);

    let imeTd = document.createElement("td");
    imeTd.innerText = korisnik.ime;
    KorisniciRed.appendChild(imeTd);

    let prezimeTd = document.createElement("td");
    prezimeTd.innerText = korisnik.prezime;
    KorisniciRed.appendChild(prezimeTd);

    // olovka
    let editTd = document.createElement("td");
    editTd.style.padding = "12px";
    // link u kom se nalazi ikonica olovka
    let novaOlovka = document.createElement("a");
    novaOlovka.setAttribute("id", "izmeniTabla");
    novaOlovka.setAttribute("href", "#")
    novaOlovka.style.color = "blue";
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
    deleteTd.style.padding = "12px";
    let novaKanta = document.createElement("a");
    novaKanta.setAttribute("id", "ukloniTabla");
    novaKanta.setAttribute("href", "#");
    novaKanta.style.color = "red";
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