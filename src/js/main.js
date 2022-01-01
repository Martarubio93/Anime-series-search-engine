"use strict";

//Elementos HTML

const input = document.querySelector(".input");
const resetButton = document.querySelector(".reset");
const submitButton = document.querySelector(".submit");
const allResultsList = document.querySelector(".js-allresults-list");
const favouriteList = document.querySelector(".js-favourite-list");

let allResults = []; //Array donde guadamos todos los que busca el usuario
let favouriteResults = []; //Array donde guardamos las series favoritas del usuario

//Function to get infor from LS
function getInfoFrom() {
  if (localStorage.getItem("data")) {
    favouriteResults = JSON.parse(localStorage.getItem("data"));
    paintFavList(favouriteResults);
  }
}

getInfoFrom();

//Function fetch to get information from Api
function getApiInformation(event) {
  let userSearch = input.value; //Info que busca el usuario
  event.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${userSearch}`)
    .then((response) => response.json())
    .then((seriesData) => {
      allResults = seriesData.results; //Guardamos seriesData en allResults
      paintAllResults(); //Pintamos
    });
}

//Event para buscar
submitButton.addEventListener("click", getApiInformation);

//function que pinta la lista de resultados
function paintAllResults() {
  allResultsList.innerHTML = "";

  for (let i = 0; i < allResults.length; i++) {
    const resultsImg = allResults[i].image_url;
    const resultsName = allResults[i].title;
    if (resultsImg !== null) {
      allResultsList.innerHTML += `<li class="results_container__list--item addtofav" data-name="${resultsName}" data-img="${resultsImg}" > <img class="results_container__list--img" src="${resultsImg}alt=""> <h2 class="results_container__list--h2" >${resultsName}</h2>
      </li>`;
    } else {
      allResultsList.innerHTML += `<li class="results_container__list--item addtofav"> <img class="results_container__list--img" src="https://via.placeholder.com/210x295/ffffff/666666/?" alt="Imagen no encontrada" <h2 class="results_container__list--h2">${resultsName} </h2></li>`;
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
  const filmChangeColor = event.currentTarget; //acceder al currentTarget para cambiar el color del borde
  filmChangeColor.classList.toggle("fav"); //Cambia de color al clicar
  if (filmChangeColor.classList.contains("fav")) {
    favouriteResults.push(filmSelected); //Si tiene esa clase lo pushea al array de favoritos
  } else {
    favouriteResults.pop(filmSelected); //Si no la tiene la elimina para que no se duplique
  }

  localStorage.setItem("data", JSON.stringify(favouriteResults));
  paintFavList();
}

//Pintamos lo que hay en el array favouriteResults
function paintFavList() {
  favouriteList.innerHTML = "";
  for (let index = 0; index < favouriteResults.length; index++) {
    const favElement = favouriteResults[index].name;
    const favImg = favouriteResults[index].img;

    if (favImg !== null) {
      favouriteList.innerHTML += `<li class="favourite_container__list--item data-name="${favElement}" data-img="${favImg}""> <img class="favourite_container__list--img" src="${favImg}"><h2 class="favourite_container__list--h2"> ${favElement} </h2> <span class="delete"> X </span> </li>`;
    } else {
      favouriteList.innerHTML += `<li class="favourite_container__list--item"> <img class="favourite_container__list--img" src="https://via.placeholder.com/210x295/ffffff/666666/?" alt="Imagen no encontrada" <h2 class="results_container__list--h2"> </h2> <span class="delete"> X </span></li>`;
    }
  }
  const deleteIcons = document.querySelectorAll(".delete");
  for (const eachDeleteIcon of deleteIcons) {
    eachDeleteIcon.addEventListener("click", deleteElementFromFavList);
  }
}
//Function que elimina el elemento seleccionado del array favoritos

function deleteElementFromFavList(event) {
  console.log(event.target.parentNode);
  const elementLS = event.target.parentNode;
  favouriteResults.pop(elementLS);
  paintFavList();
}

//Function reset (Elimina los todos los resultados)

function resetAllResults(event) {
  event.preventDefault();
  allResultsList.innerHTML = ""; //Vaciamos lista
  input.value = "";
  allResults.splice(0, allResults.length); //Eliminamos todos los elementos  del array y empezamos de nuevo
}

resetButton.addEventListener("click", resetAllResults);
