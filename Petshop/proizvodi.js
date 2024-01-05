let proizvodi = {};
let slike = {};
console.log(slike);

let listaProizvoda = document.getElementById("sviproizvodi");
console.log(listaProizvoda);

let getproizvod = new XMLHttpRequest();
getproizvod.onreadystatechange = function() {
    if (this.readyState == 4){
        if (this.status == 200){
            proizvodi = JSON.parse(this.response);
            console.log(proizvodi);
            for (id in proizvodi){
                let proizvod = proizvodi[id];
                slike = proizvod.slike;
                let glavnaSlika = slike[0];
                console.log(glavnaSlika);
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
        <a href="proizvod1.html" id="proizvodi">
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
}