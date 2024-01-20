let firebaseurl = "https://pet-shop-fff9d-default-rtdb.europe-west1.firebasedatabase.app";

let noviProizvod = {cena: "", detaljanOpis: "", kratakOpis: "", naziv: "", ocene: [0], prosecnaOcena: "0", slike:[], tip: "", uKorpi: false};
let proizvodi = {}

let reqreq = new XMLHttpRequest();
reqreq.onreadystatechange = function() {
    if (this.readyState == 4){
        if (this.status == 200){
            proizvodi = JSON.parse(this.response);
        } else {

        }
    }
}
reqreq.open("GET", firebaseurl + "/proizvodi/-MNVEu6iMr2EFlQO6TW60.json");
reqreq.send();

const prodAddForm = document.querySelector("#productAdd");
prodAddForm.addEventListener('submit', event => {
    event.preventDefault();

    // Validacija za tip proizvoda
    let tipProizvoda = document.querySelector("#tip").value;
    if (tipProizvoda == "") {
        noviProizvod.tip = "";
        let upozorenjeTip = document.querySelector("#upozorenjeTip");
        upozorenjeTip.innerHTML = "Popunite ovo polje."
    }
    else if (!/^[^\d]*$/.test(tipProizvoda)) {
        noviProizvod.tip = "";
        upozorenjeTip.innerText = "Tip ne sme da sadrži brojeve.";
    }
    else {
        noviProizvod.tip = tipProizvoda;
        upozorenjeTip.innerText = "";
    }

    // Validacija za naziv proizvoda
    let imeProizvoda = document.querySelector("#imeprod").value;
    if (imeProizvoda == "") {
        noviProizvod.naziv = "";
        let upozorenjeNaziv = document.querySelector("#upozorenjeNaziv");
        upozorenjeNaziv.innerHTML = "Popunite ovo polje."
    }
    else if (!/^[^\d]*$/.test(imeProizvoda)) {
        noviProizvod.naziv = "";
        upozorenjeNaziv.innerText = "Naziv ne sme da sadrži brojeve.";
    }
    else {
        noviProizvod.naziv = imeProizvoda;
        upozorenjeNaziv.innerText = "";
    }

    // Validacija za cenu proizvoda
    let cenaProizvoda = document.querySelector("#cenaprod").value;
    if (cenaProizvoda == ""){
        noviProizvod.cena = "";
        let upozorenjeCena = document.querySelector("#upozorenjeCena");
        upozorenjeCena.innerHTML = "Popunite ovo polje."
    }
    else if (cenaProizvoda < 0){
        noviProizvod.cena = "";
        let upozorenjeCena = document.querySelector("#upozorenjeCena");
        upozorenjeCena.innerHTML = "Unesite važeću cenu."
    }
    else {
        noviProizvod.cena = cenaProizvoda;
    }

    let slikaProizvoda1 = document.querySelector("#slikeprod1").value;
    if (slikaProizvoda1 == ""){
        let upozorenjeSlika = document.querySelector("#upozorenjeSlika");
        upozorenjeSlika.innerHTML = "Popunite ovo polje."
        upozorenjeSlika.style.color = "red";
    }
    else {
        upozorenjeSlika.innerHTML = "";
        noviProizvod.slike.push(slikaProizvoda1);
    }

    let slikaProizvoda2 = document.querySelector("#slikeprod2").value;
    if (slikaProizvoda2 != ""){
        noviProizvod.slike.push(slikaProizvoda2);
    }

    let slikaProizvoda3 = document.querySelector("#slikeprod3").value;
    if (slikaProizvoda3 != ""){
        noviProizvod.slike.push(slikaProizvoda3);
    }

    // Validacija za kratak opis
    let kratakOpis = document.querySelector("#kopisprod").value;
    if (kratakOpis == ""){
        noviProizvod.kratakOpis = "";
        let upozorenjeKopis = document.querySelector("#upozorenjeKopis");
        upozorenjeKopis.innerHTML = "Popunite ovo polje."
    }
    else {
        noviProizvod.kratakOpis = kratakOpis;
        upozorenjeKopis.innerHTML = "";
    }

    // Validacija za detaljan Opis.
    let detaljanOpis = document.querySelector("#dopis").value;
    if (detaljanOpis == ""){
        noviProizvod.detaljanOpis = "";
        let upozorenjeDopis = document.querySelector("#upozorenjeDopis");
        upozorenjeDopis.innerHTML = "Popunite ovo polje."
    }
    else {
        noviProizvod.detaljanOpis = detaljanOpis;
        upozorenjeDopis.innerHTML = "";
    }

    if (noviProizvod.tip != "" && noviProizvod.naziv != "" && noviProizvod.cena != "" && noviProizvod.kratakOpis != "" && noviProizvod.detaljanOpis != ""){
        let proizvodSlanje = JSON.stringify(noviProizvod);

        let newProdReq = new XMLHttpRequest();
        newProdReq.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "index.html";
                } else {
                    alert("Greska prilikom dodavanja proizvoda.");
                }
            }
        }
        newProdReq.open("POST", firebaseurl + "/proizvodi/-MNVEu6iMr2EFlQO6TW60.json");
        newProdReq.send(proizvodSlanje);
    }
})





// function dodajProizvod(){
//     let tipProizvoda = document.querySelector("#tip").value;
//     let imeProizvoda = document.querySelector("imep").value;
//     let cenaProizvoda = document.querySelector("#cenap").value;
//     let kratakOpis = document.querySelector("#kopis").value;
//     let detaljanOpis = document.querySelector("#dopis").value;
//     noviProizvod.cena = cenaProizvoda;
//     noviProizvod.detaljanOpis = detaljanOpis;
//     noviProizvod.kratakOpis = kratakOpis;
//     noviProizvod.naziv = imeProizvoda;
//     noviProizvod.tip = tipProizvoda;

//     console.log(noviProizvod);


//     let reqpost = new XMLHttpRequest();
//     reqpost.onreadystatechange = function() {
//         if (this.readyState == 4){
//             if (this.status == 200){
                
//             } else {

//             }
//         }
//     }
//     reqpost.open("POST", firebaseurl + "/proizvodi/-MNVEu6iMr2EFlQO6TW60.json");
//     reqpost.send(JSON.stringify(noviProizvod));
// }
