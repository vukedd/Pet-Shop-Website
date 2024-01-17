
let proizvodi = {}; // ovde su svi proizvodi
let slike = {};
let listaProizvoda = document.getElementById("sviproizvodi");

let getproizvod = new XMLHttpRequest();
getproizvod.onreadystatechange = function() {
    if (this.readyState == 4){
        if (this.status == 200){
            proizvodi = JSON.parse(this.response);
            for (let id in proizvodi){
                let proizvod = proizvodi[id];
                slike = proizvod.slike;
                let glavnaSlika = slike[0];
                proizvodAppend(listaProizvoda, id, proizvod, glavnaSlika);
            }
        } else {

        }
    }
}
getproizvod.open("GET", FirebaseURL + "/proizvodi/-MNVEu6iMr2EFlQO6TW60.json")
getproizvod.send();

function proizvodAppend(listaProizvoda, id, proizvod, slika) {
    let sviProizvodi = listaProizvoda;
    let karticaProizvoda = document.createElement("div");
    karticaProizvoda.innerHTML = `
    <div class="card" id="kartica" style="width: 15rem;">
        <a href="proizvod1.html" class="proizvodi-link">
          <img class="card-img-top" src="${slika}" alt="Card image cap">
          <div class="card-body">
            <h5 id="card-title">${proizvod.naziv}</h5>
        </a>
        <p class="text-muted">${proizvod.kratakOpis}</p>
      </div>
      <div class="indexcena">
        <p>${proizvod.cena} RSD</p>
      </div>
      <div class="card-body1">
        <a href="#" id="cartbut" class="btn btn-">Dodaj u korpu</a>
      </div>
    </div>
    `
    sviProizvodi.appendChild(karticaProizvoda);

    // Dodeli linku koji vodi na proizvod sa odgovarajucim id-om;
    let linkDoProizvoda = karticaProizvoda.querySelector('.proizvodi-link');
    linkDoProizvoda.addEventListener("click", (event) => {
        // Preuzmi ID iz linka iz ?id=${'id'};
        let kliknutiProizvod = id;

        // Sacuvaj id u local storage.
        localStorage.setItem('id', kliknutiProizvod);
    });
}
