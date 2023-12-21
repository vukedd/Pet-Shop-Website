// FirebaseURL = "https://pet-shop-fff9d-default-rtdb.europe-west1.firebasedatabase.app";
 
// let korisnik = {}

// let getRequest = new XMLHttpRequest();

// getRequest.onreadystatechange = function(e) {
//     if (this.readyState == 4){
//         if (this.status == 200) {
//             korisnik = JSON.parse(getRequest.responseText);
//         }
//         else {
//             alert("Greska prilikom ucitavanja korisnika.");
//         }
//     }
// }
// getRequest.open("GET", FirebaseURL + "/korisnici/" + korisnikId + ".json");
// getRequest.send();

// console.log(korisnik)

// let editForm = document.getElementById("editModal");

// // editForm.addEventListener('submit', function (e) {
// //     e.preventDefault();

// //     let ime = document.querySelector("#imedit").value;
// //     let prezime = document.querySelector("#prezimedit").value;
// //     let korisnickoIme = document.querySelector("#unedit").value;
// //     let telefontext = document.querySelector("#telefonedit").value;
// //     let datumRodjenjatext = document.querySelector("#datepickeredit").value;
// //     let adresa = document.querySelector("#adresaedit").value;
// //     let lozinka = document.querySelector("#passwordedit").value;
// //     let email = document.querySelector("#emailedit").value;
// //     let telefon = parseInt(telefontext);
// //     let datumRodjenja = parseInt(datumRodjenjatext);

// // })
      

// /* 
//     Pomocna funkcija koja ocitava vrednost URL parametra sa prosledjenim imenom
//  */
//     function getParamValue(name) {
//         let location = decodeURI(window.location.toString());
//         let index = location.indexOf("?") + 1;
//         let subs = location.substring(index, location.length);
//         let splitted = subs.split("&");
      
//         for (i = 0; i < splitted.length; i++) {
//           let s = splitted[i].split("=");
//           let pName = s[0];
//           let pValue = s[1];
//           if (pName == name) {
//             return pValue;
//           }
//         }
//       }
      