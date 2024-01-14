var noviKorisnik = {
    adresa: "", datumRodjenja: "", email: "", ime: "", korisnickoIme: "", lozinka: "", prezime: "", telefon: ""
}

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
    else if (!/[a-zA-Z].*\d{5,}$/.test(adresareg)){
        erroradresa.innerText = "Neophodno je uneti poštanski broj."
        erroradresa.style.color = "red";
    }
    else {
        erroradresa.innerText = "";
        noviKorisnik.adresa = adresareg.trim();
    }

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
    else if (!/^06\d-[0-9]{3,4}-[0-9]{3}$/.test(telreg)){
        errortel.innerText = "Format za unos: 06x-xxx(x)-xxx";
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