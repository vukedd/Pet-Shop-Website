
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
                let prosecnaOcena = document.querySelector("#prosekOcena");
                let detaljanOpis = document.querySelector("#cbody");
                console.log(proizvodinfo);
                proizvodnaslov.innerHTML = proizvodinfo.naziv;
                tip.innerHTML = proizvodinfo.tip;
                cena.innerHTML = proizvodinfo.cena + " RSD";
                prosecnaOcena.innerHTML = proizvodinfo.prosecnaOcena;
                detaljanOpis.innerHTML = proizvodinfo.detaljanOpis;
                let sveOcene = proizvodinfo.ocene;
                let brojOcena = document.querySelector("#brojOcena");
                brojOcena.innerHTML = sveOcene.length;

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
    
    let oceniProizvod = document.querySelector("#oceni");
    oceniProizvod.addEventListener("click", (e) => {
        e.preventDefault();
        let ocenaZaDodati = document.querySelector("#ocena").value;
        if (ocenaZaDodati > 0 && ocenaZaDodati < 11){
            let ocenaZaDodatireal = parseInt(ocenaZaDodati);
            sveOcene.push(ocenaZaDodatireal);
            proizvodinfo.ocene = sveOcene;
            let suma = 0;
            for(let index = 0; index < sveOcene.length; index++){
                console.log(sveOcene[index]);
                suma = suma + sveOcene[index];
            }
            let prosecnaOcenaZaDodati = suma / sveOcene.length;
            proizvodinfo.prosecnaOcena = prosecnaOcenaZaDodati.toFixed(2);
            
            let ProsekRequest = new XMLHttpRequest();
            ProsekRequest.onreadystatechange = function(){
                if (this.readyState == 4){
                    if (this.status == 200){
                        location.reload();
                    } else {
                        console.log("ne");
                    }
                }
            }
            ProsekRequest.open("PUT", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60/" + idprodcina + ".json");
            ProsekRequest.send(JSON.stringify(proizvodinfo));
        }
        else {
            let upozorenje = document.querySelector("#upozorenje");
            upozorenje.innerHTML = "Molim vas unesite ocenu između 1 i 10."
        }
    })
            } else {

            }
        }
    }
    productreq.open("GET", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60/" + idprodcina + ".json");
    productreq.send();

    
    let obrisiDugme = document.querySelector("#obrisiProizvod");
    obrisiDugme.addEventListener("click", (event) => {

        event.preventDefault();
        var odgovor = confirm("Da li ste sigurni da želite da obrišete ovaj proizvod?");

        if (odgovor){
            let DelProdRequest = new XMLHttpRequest();
            DelProdRequest.onreadystatechange = function (){
                if (this.readyState == 4){
                    if (this.status == 200){
                        window.location.href = "index.html";
                    } else {
                        console.log("Neuspešno brisanje proizvoda.")
                    }
                }
            }
            DelProdRequest.open("DELETE", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60/" + idprodcina + ".json");
            DelProdRequest.send();
        }
    });

    
    
}
