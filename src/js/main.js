"use strict";

//Elementos HTML

const input = document.querySelector(".input");
const resetButton = document.querySelector(".reset");
const submitButton = document.querySelector(".submit");
const allResultsList = document.querySelector(".js-allresults-list");
const favouriteList = document.querySelector(".js-favourite-list");
const resetFav = document.querySelector(".fav-btn-js");
const imgError = "https://via.placeholder.com/210x295/ffffff/666666/?";

let allResults = []; //Array para la búsqueda del usuario
let favouriteResults = []; //Array para las series favoritas

//Function to get infor from LS
function getInfoFromLS() {
  if (localStorage.getItem("data")) {
    favouriteResults = JSON.parse(localStorage.getItem("data"));
    paintFavList(favouriteResults);
  }
}

getInfoFromLS();

//Function fetch to get information from Api
function getApiInformation(event) {
  let userSearch = input.value;
  event.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${userSearch}`)
    .then((response) => response.json())
    .then((seriesData) => {
      allResults = seriesData.results; //Guardamos seriesData en allResults

      paintAllResults(); //Pintamos
    });
}

//Fetch event
submitButton.addEventListener("click", getApiInformation);

//function que pinta la lista de resultados
function paintAllResults() {
  allResultsList.innerHTML = "";

  for (let i = 0; i < allResults.length; i++) {
    const resultsImg = allResults[i].image_url.replace(imgError);
    const resultsName = allResults[i].title;
    const checkIfisFav = favouriteResults.findIndex(
      (name) => name.name === resultsName
    ); //Busca si el nombre coincide con alguno que esta en el array de fav, si esta lo pinta añadiendo la clase.
    if (checkIfisFav >= 0) {
      allResultsList.innerHTML += `<li class="results_container__list--item addtofav fav" data-name="${resultsName}" data-img="${resultsImg}" > <img class="results_container__list--img" src="${resultsImg}"alt="img"> <h2 class="results_container__list--h2 titles favtitle" >${resultsName}</h2> <p results_container__list--h2> 
      </li>`;
    } else {
      allResultsList.innerHTML += `<li class="results_container__list--item addtofav" data-name="${resultsName}" data-img="${resultsImg}"> <img class="results_container__list--img" src="${resultsImg}" alt="Imagen no encontrada"> <h2 class="results_container__list--h2 titles">${resultsName}</h2></li>`;
    }
  }
  const allFilms = document.querySelectorAll(".addtofav"); //añado evento a cada peli que aparece para poder añadirla a la lista de favoritos
  for (const favFilm of allFilms) {
    favFilm.addEventListener("click", addToFavList);
  }
}

//El elemento clicado se guardará en el array favouriteResults
function addToFavList(event) {
  const filmSelected = event.currentTarget.dataset;
  const title = event.currentTarget.lastChild.previousSibling.nextSibling; //acceder h2
  const filmChangeColor = event.currentTarget; //acceder al currentTarget
  title.classList.toggle("favtitle");
  filmChangeColor.classList.toggle("fav"); //Cambia de color al clicar

  if (filmChangeColor.classList.contains("fav")) {
    favouriteResults.push(filmSelected); //Si tiene esa clase lo pushea al array de favoritos
  } else {
    const findFav = favouriteResults.findIndex(
      (item) => item.name === filmSelected.name
    );
    favouriteResults.splice(findFav, 1);
  }

  localStorage.setItem("data", JSON.stringify(favouriteResults));
  paintFavList();
}

//Pintamos lo que hay en el array favouriteResults
function paintFavList() {
  favouriteList.innerHTML = "";
  for (let index = 0; index < favouriteResults.length; index++) {
    const favElement = favouriteResults[index].name;
    const favImg = favouriteResults[index].img.replace(imgError);
    if (favImg !== null) {
      favouriteList.innerHTML += `<li class="favourite_container__list--item data-name="${favElement}" data-img="${favImg}" > <img class="favourite_container__list--img" src="${favImg}"><h2 class="favourite_container__list--h2"> ${favElement} </h2> <span class="delete"> X </span> </li>`;
    } else {
      favouriteList.innerHTML += `<li class="favourite_container__list--item data-name="${favElement}" data-img="${favImg}""> <img class="favourite_container__list--img" src="${favImg}" alt="Imagen no encontrada" <h2 class="results_container__list--h2"> ${favElement} </h2>  <span class="delete"> X </span></li>`;
    }
  }
  const deleteIcons = document.querySelectorAll(".delete");
  for (const eachDeleteIcon of deleteIcons) {
    eachDeleteIcon.addEventListener("click", deleteElementFromFavList);
  }
}
//Function que elimina el elemento del array favoritos

function deleteElementFromFavList(event) {
  const elementLS = event.target.parentNode.dataset;
  //Busco el indice del elemento para poder borrarlo
  const findElement = favouriteResults.findIndex(
    (item) => item.img === elementLS.img
  );
  favouriteResults.splice(findElement, 1); //Si se cumple la condicion se borra

  paintAllResults(); //y vuelvo a pintar todos los resultados, para que aprezcan sin la clase
  paintFavList();
}

//Function reset (Elimina los todos los resultados)

function resetAllResults(event) {
  event.preventDefault();
  allResultsList.innerHTML = ""; //Vaciamos lista
  input.value = ""; //Vaciamos input
  allResults.splice(0, allResults.length); //Eliminamos todos los elementos  del array
}

resetButton.addEventListener("click", resetAllResults);

//Function reset (Elimina todos los favoritos de array y LS)
function resetAllfav(event) {
  event.preventDefault();
  favouriteResults.innerHTML = "";
  favouriteResults.splice(0, favouriteResults.length);
  localStorage.removeItem("data");
  paintFavList();
}

resetFav.addEventListener("click", resetAllfav);
