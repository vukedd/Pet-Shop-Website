let idprodcina;
let proizvodinfo = {};

// Na ucitavanje stranice preuzmi id iz local storage-a
window.onload = function() {
    idprodcina = localStorage.getItem('id');
    console.log(idprodcina);

    let productreq = new XMLHttpRequest();
    productreq.onreadystatechange = function () {
        if (this.readyState == 4){
            if (this.status == 200){
                // Dodavanje detalja u stranicu sa proizvodima.
                proizvodinfo = JSON.parse(this.response);
                let proizvodnaslov = document.querySelector("#producthead");
                let tip = document.querySelector("#hzp");
                let cena = document.querySelector("#rsd");
                let prosecnaOcena = document.querySelector("#POcena");
                let detaljanOpis = document.querySelector("#cbody");
                console.log(proizvodinfo);
                proizvodnaslov.innerHTML = proizvodinfo.naziv;
                tip.innerHTML = proizvodinfo.tip;
                cena.innerHTML = proizvodinfo.cena + " RSD";
                prosecnaOcena.innerHTML = proizvodinfo.prosecnaOcena;
                detaljanOpis.innerHTML = proizvodinfo.detaljanOpis;

                // Popunjavanje carousela
                // let carouselSlike = document.querySelector("#carousel-inner");
                // console.log(proizvodinfo.slike);
                // slike.forEach(element => {
                //     var slide = document.createElement("div");
                //     slide.setAttribute("carousel-item active");

                //     var image = document.createElement("img");
                //     image.src = 
                // });
                let proizvodinfoEdit = {cena: "", detaljanOpis: "", kratakOpis: "", naziv:"", ocene: proizvodinfo.ocene, prosecnaOcena: proizvodinfo.prosecnaOcena, slike: proizvodinfo.slike, tip: proizvodinfo.tip, uKorpi: false};

    let editProduct = document.querySelector("#izmeniProizvod")
    editProduct.addEventListener("click", (e) => {
        e.preventDefault();
        let nazivIzmenaEdit = document.querySelector("#nazivProd");
        nazivIzmenaEdit.setAttribute("value", proizvodinfo.naziv);

        let tipProzivodEdit = document.querySelector("#tipProizvod");
        tipProzivodEdit.setAttribute("value", proizvodinfo.tip);

        let cenaProizvodaEdit = document.querySelector("#cenaProizvoda");
        cenaProizvodaEdit.setAttribute("value", proizvodinfo.cena);

        let detaljanOpisEdit = document.querySelector("#detaljanOpis");
        detaljanOpisEdit.innerHTML = proizvodinfo.detaljanOpis;

        let kratakOpisEdit = document.querySelector("#kratakOpis");
        kratakOpisEdit.innerHTML = proizvodinfo.kratakOpis;

        
    })

    let potvrdiEditProd = document.querySelector("#IzmeniProduct");
    potvrdiEditProd.addEventListener("click", (e) => {
        e.preventDefault();
        let nazivIzmenaPotvrda = document.querySelector("#nazivProd").value;
        proizvodinfoEdit.naziv = nazivIzmenaPotvrda;

        let cenaIzmenaPotvrda = document.querySelector("#cenaProizvoda").value;
        proizvodinfoEdit.cena = cenaIzmenaPotvrda;

        let tipProizvodaPotvrda = document.querySelector("#tipProizvod").value;
        proizvodinfoEdit.tip = tipProizvodaPotvrda;

        let detaljanOpisPotvrdi = document.querySelector("#detaljanOpis").value;
        proizvodinfoEdit.detaljanOpis = detaljanOpisPotvrdi;
                    
        let kratakOpisPotvrdi = document.querySelector("#kratakOpis").value;
        proizvodinfoEdit.kratakOpis = kratakOpisPotvrdi;        
        
        console.log(proizvodinfoEdit);

        let potvrdiIzmeneReq = new XMLHttpRequest();
        potvrdiIzmeneReq.onreadystatechange = function() {
            if (this.readyState == 4){
                if(this.status == 200){
                    location.reload();
                } else {
                    alert("Greska prilikom azuriranja proizvoda");
                }
            }
        };
        potvrdiIzmeneReq.open("PUT", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60/" + idprodcina + ".json");
        potvrdiIzmeneReq.send(JSON.stringify(proizvodinfoEdit));
    })

            } else {

            }
        }
    }
    productreq.open("GET", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60/" + idprodcina + ".json");
    productreq.send();
    
}