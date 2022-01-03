"use strict";

//Elementos HTML

const input = document.querySelector(".input");
const resetButton = document.querySelector(".reset");
const submitButton = document.querySelector(".submit");
const allResultsList = document.querySelector(".js-allresults-list");
const favouriteList = document.querySelector(".js-favourite-list");
const resetFav = document.querySelector(".fav-btn-js");

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
    const resultsImg = allResults[i].image_url;
    const resultsName = allResults[i].title;
    const resultId = allResults[i].mal_id;
    if (resultsImg !== null) {
      allResultsList.innerHTML += `<li class="results_container__list--item addtofav" data-id="${resultId}" data-name="${resultsName}" data-img="${resultsImg}" > <img class="results_container__list--img" src="${resultsImg}alt=""> <h2 class="results_container__list--h2 titles" >${resultsName}</h2>
      </li>`;
    } else {
      allResultsList.innerHTML += `<li class="results_container__list--item addtofav"> <img class="results_container__list--img" src="https://via.placeholder.com/210x295/ffffff/666666/?" alt="Imagen no encontrada" <h2 class="results_container__list--h2 titles">${resultsName} </h2></li>`;
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
  const title = event.currentTarget.lastChild.previousSibling; //acceder h2
  const filmChangeColor = event.currentTarget; //acceder al currentTarget
  title.classList.toggle("favtitle");

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
    const favId = favouriteResults[index].id;
    
    if (favImg !== null) {
      favouriteList.innerHTML += `<li class="favourite_container__list--item data-id="${favId}"> <img class="favourite_container__list--img" src="${favImg}"><h2 class="favourite_container__list--h2"> ${favElement} </h2> <span class="delete"> X </span> </li>`;
    } else {
      favouriteList.innerHTML += `<li class="favourite_container__list--item data-id="${favId}"> <img class="favourite_container__list--img" src="https://via.placeholder.com/210x295/ffffff/666666/?" alt="Imagen no encontrada" <h2 class="results_container__list--h2"> </h2> <span class="delete"> X </span></li>`;
    }
  }
  const deleteIcons = document.querySelectorAll(".delete");
  for (const eachDeleteIcon of deleteIcons) {
    eachDeleteIcon.addEventListener("click", deleteElementFromFavList);
  }
}
//Function que elimina el elemento del array favoritos

function deleteElementFromFavList(event) {
  const elementLS = event.target.parentNode.dataset.id;
  const deleteFromFav = favouriteResults.findIndex(id => id.favouriteResults === elementLS)
  favouriteResults.splice(deleteFromFav, 1);
  console.log(deleteFromFav)
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
