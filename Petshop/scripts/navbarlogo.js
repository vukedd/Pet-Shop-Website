let ime = document.querySelectorAll(".naziv");
let telefonPS = document.querySelectorAll(".telefonPS");
let informacije = {};


let requestlogo = new XMLHttpRequest();

requestlogo.onreadystatechange = function () {
    if (this.readyState == 4){
        if (this.status == 200){
            informacije = JSON.parse(this.responseText);
            for (var span in ime){
                ime[span].innerHTML = informacije.naziv;
            }
            
            for (var span in telefonPS){
                telefonPS[span].innerHTML = informacije.telefon;
            }

            // var logo = informacije.logo;
            // slika.setAttribute("src", logo);
            // console.log(slika);
            // slika.style.width="20%";
        }
    }
}
requestlogo.open("GET", FirebaseURL + "/petShop.json");
requestlogo.send();