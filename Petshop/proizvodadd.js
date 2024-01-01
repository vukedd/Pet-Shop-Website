let firebaseurl = "https://pet-shop-fff9d-default-rtdb.europe-west1.firebasedatabase.app";

let noviProizvod = {cena: "", detaljanOpis: "", kratakOpis: "", naziv: "", ocene: {0: ""}, prosecnaOcena: "", slike:{0:""}, tip: "", uKorpi: false};
let proizvodi = {}

let reqreq = new XMLHttpRequest();
reqreq.onreadystatechange = function() {
    if (this.readyState == 4){
        if (this.status == 200){
            proizvodi = JSON.parse(this.response);
            console.log(proizvodi);
        } else {

        }
    }
}
reqreq.open("GET", firebaseurl + "/proizvodi/-MNVEu6iMr2EFlQO6TW60.json");
reqreq.send();

const prodAddForm = document.querySelector("#productAdd");
prodAddForm.addEventListener('submit', event => {
    event.preventDefault();

    let tipProizvoda = document.querySelector("#tip").value;
    noviProizvod.tip = tipProizvoda;

    let imeProizvoda = document.querySelector("#imeprod").value;
    noviProizvod.naziv = imeProizvoda;

    let cenaProizvoda = document.querySelector("#cenaprod").value;
    noviProizvod.cena = cenaProizvoda;

    let kratakOpis = document.querySelector("#kopisprod").value;
    noviProizvod.kratakOpis = kratakOpis;

    let detaljanOpis = document.querySelector("#dopis").value;
    noviProizvod.detaljanOpis = detaljanOpis;

    let proizvodSlanje = JSON.stringify(noviProizvod);

    let newProdReq = new XMLHttpRequest();
    newProdReq.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Uspesno ste dodali novi proizvod.");
            } else {
                alert("Greska prilikom dodavanja proizvoda.");
            }
        }
    }
    newProdReq.open("POST", firebaseurl + "/proizvodi/-MNVEu6iMr2EFlQO6TW60.json");
    newProdReq.send(proizvodSlanje);
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
