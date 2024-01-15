let idprodcina;
let proizvodinfo = {};

// Na ucitavanje stranice preuzmi id iz local storage-a
window.onload = function() {
    idprodcina = localStorage.getItem('id');

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
                proizvodnaslov.innerHTML = proizvodinfo.naziv;
                tip.innerHTML = proizvodinfo.tip;
                cena.innerHTML = proizvodinfo.cena +",00 RSD";
                prosecnaOcena.innerHTML = proizvodinfo.prosecnaOcena;
                detaljanOpis.innerHTML = proizvodinfo.detaljanOpis;
                let sveOcene = proizvodinfo.ocene;
                let brojOcena = document.querySelector("#brojOcena");
                brojOcena.innerHTML = sveOcene.length;

                // Popunjavanje carousela
                let carouselSlike = document.querySelector(".carousel-inner");
                let slikeProizvoda = proizvodinfo.slike;

                // Prva petlja koja ce dodati samo prvu slike sa classom carousel-item active.
                for (element in slikeProizvoda){
                    let karoselSlide = document.createElement("div");
                    karoselSlide.setAttribute("class", "carousel-item active");

                    let slikaSlide = document.createElement("img");
                    slikaSlide.setAttribute("src", slikeProizvoda[0]);
                    slikaSlide.setAttribute("class", "d-block w-100");
                
                    karoselSlide.appendChild(slikaSlide);
                    carouselSlike.appendChild(karoselSlide);
                    break;
                }
                
                // Druga petlja koja ce dodati preostale slike sa classom carousel-item
                for (let i = 1; i < slikeProizvoda.length; i++){
                    let karoselSlide = document.createElement("div");
                    karoselSlide.setAttribute("class", "carousel-item");

                    let slikaSlide = document.createElement("img");
                    slikaSlide.setAttribute("src", slikeProizvoda[i]);
                    slikaSlide.setAttribute("class", "d-block w-100");
                
                    karoselSlide.appendChild(slikaSlide);
                    carouselSlike.appendChild(karoselSlide);
                }
                    
                    let proizvodinfoEdit = {cena: "", detaljanOpis: "", kratakOpis: "", naziv:"", ocene: proizvodinfo.ocene, prosecnaOcena: proizvodinfo.prosecnaOcena, slike: proizvodinfo.slike, tip: proizvodinfo.tip, uKorpi: false};
    
                    // Event listener koji ce popuniti formu za edit nakon klika na olovku
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
                
                    // Event listener koji ce poslati put request izmenjenih podataka ukoliko je sve popunjeno.
                    let potvrdiEditProd = document.querySelector("#IzmeniProduct");
                    potvrdiEditProd.addEventListener("click", (e) => {
                        e.preventDefault();

                        let nazivIzmenaPotvrda = document.querySelector("#nazivProd").value;
                        let EditNazivAlert = document.querySelector("#editNazivAlert");
                        if (nazivIzmenaPotvrda == ""){
                            proizvodinfoEdit.naziv = "";
                            EditNazivAlert.innerHTML = " Neophodno je popuniti ovo polje";
                            EditNazivAlert.style.color = "red";
                        }
                        else{
                            EditNazivAlert.innerHTML = "";
                            proizvodinfoEdit.naziv = nazivIzmenaPotvrda;
                        }

                        // 000000000000000000000000
                        let cenaIzmenaPotvrda = document.querySelector("#cenaProizvoda").value;
                        let EditCenaAlert = document.querySelector("#editCenaAlert");
                        if (cenaIzmenaPotvrda == ""){
                            proizvodinfoEdit.cena = "";
                            EditCenaAlert.innerHTML = " Neophodno je popuniti ovo polje";
                            EditCenaAlert.style.color = "red";
                        }
                        else if(!/^[1-9]\d*$/.test(cenaIzmenaPotvrda)){
                            proizvodinfoEdit.cena = "";
                            EditCenaAlert.innerHTML = " Unesite važeću cenu!";
                            EditCenaAlert.style.color = "red";
                        }
                        else{
                            EditCenaAlert.innerHTML = "";
                            proizvodinfoEdit.cena = cenaIzmenaPotvrda;
                        }

                        // 0000000000000000000000000
                        let tipProizvodaPotvrda = document.querySelector("#tipProizvod").value;
                        let EditTipAlert = document.querySelector("#editTipAlert");
                        if (tipProizvodaPotvrda == ""){
                            proizvodinfoEdit.tip = "";
                            EditTipAlert.innerHTML = " Neophodno je popuniti ovo polje";
                            EditTipAlert.style.color = "red";
                        }
                        else{
                            EditTipAlert.innerHTML = "";
                            proizvodinfoEdit.tip = tipProizvodaPotvrda;
                        }
                
                        let detaljanOpisPotvrdi = document.querySelector("#detaljanOpis").value;
                        let EditDopisAlert = document.querySelector("#editDopisAlert");
                        if (detaljanOpisPotvrdi == ""){
                            proizvodinfoEdit.detaljanOpis = "";
                            EditDopisAlert.innerHTML = " Neophodno je popuniti ovo polje";
                            EditDopisAlert.style.color = "red";
                        }
                        else{
                            EditDopisAlert.innerHTML = "";
                            proizvodinfoEdit.detaljanOpis = detaljanOpisPotvrdi;
                        }
                                    
                        let kratakOpisPotvrdi = document.querySelector("#kratakOpis").value;
                        let EditKopisAlert = document.querySelector("#editKopisAlert");
                        if (kratakOpisPotvrdi == ""){
                            proizvodinfoEdit.kratakOpis = "";
                            EditKopisAlert.innerHTML = " Neophodno je popuniti ovo polje";
                            EditKopisAlert.style.color = "red";
                        }
                        else{
                            EditKopisAlert.innerHTML = "";
                            proizvodinfoEdit.kratakOpis = kratakOpisPotvrdi;
                        }   
                        

                        if (proizvodinfoEdit.naziv != "" && proizvodinfoEdit.tip != "" && proizvodinfoEdit.cena != "" && proizvodinfoEdit.detaljanOpis != "" && proizvodinfoEdit.kratakOpis != ""){
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
                        }
                    })
                    
                    // event listener na dugmetu za slanje ocene u bazu podatka koje takodje racuna prosek i popunjava array sa ocenama novom ocenom.
                    let oceniProizvod = document.querySelector("#oceni");
                    oceniProizvod.addEventListener("click", (e) => {
                        e.preventDefault();
                        let ocenaZaDodati = document.querySelector("#ocena").value;
                        if (ocenaZaDodati > 1 && ocenaZaDodati < 11){
                            let ocenaZaDodatireal = parseInt(ocenaZaDodati);
                            sveOcene.push(ocenaZaDodatireal);
                            proizvodinfo.ocene = sveOcene;
                            let suma = 0;
                            for(let index = 0; index < sveOcene.length; index++){
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
                                        alert()
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
                
                    let obrisiDugme = document.querySelector("#obrisiProizvod");
                    obrisiDugme.addEventListener("click", (event) => {
                
                        let DelProdRequest = new XMLHttpRequest();
                        DelProdRequest.onreadystatechange = function (){
                            if (this.readyState == 4){
                                if (this.status == 200){
                                    window.location.href = "index.html";
                                } else {
                                    alert("Neuspešno brisanje proizvoda")
                                }
                            }
                        }
                        DelProdRequest.open("DELETE", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60/" + idprodcina + ".json");
                        DelProdRequest.send();
                    });
                

            } else {
                alert("Greška prilikom učitavanja podataka iz firebase-a");
            }
        }
    }
    productreq.open("GET", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60/" + idprodcina + ".json");
    productreq.send();

}
