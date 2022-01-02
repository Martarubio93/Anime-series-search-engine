"use strict";const input=document.querySelector(".input"),resetButton=document.querySelector(".reset"),submitButton=document.querySelector(".submit"),allResultsList=document.querySelector(".js-allresults-list"),favouriteList=document.querySelector(".js-favourite-list"),resetFav=document.querySelector(".fav-btn-js");let allResults=[],favouriteResults=[];function getInfoFrom(){localStorage.getItem("data")&&(favouriteResults=JSON.parse(localStorage.getItem("data")),paintFavList(favouriteResults))}function getApiInformation(t){let e=input.value;t.preventDefault(),fetch("https://api.jikan.moe/v3/search/anime?q="+e).then(t=>t.json()).then(t=>{allResults=t.results,paintAllResults()})}function paintAllResults(){allResultsList.innerHTML="";for(let t=0;t<allResults.length;t++){const e=allResults[t].image_url,s=allResults[t].title;allResultsList.innerHTML+=null!==e?`<li class="results_container__list--item addtofav" data-name="${s}" data-img="${e}" > <img class="results_container__list--img" src="${e}alt=""> <h2 class="results_container__list--h2" >${s}</h2>\n      </li>`:`<li class="results_container__list--item addtofav"> <img class="results_container__list--img" src="https://via.placeholder.com/210x295/ffffff/666666/?" alt="Imagen no encontrada" <h2 class="results_container__list--h2 titles">${s} </h2></li>`}const t=document.querySelectorAll(".addtofav");for(const e of t)e.addEventListener("click",addToFavList)}function addToFavList(t){const e=t.currentTarget.dataset,s=t.currentTarget;s.classList.toggle("fav"),s.classList.contains("fav")?favouriteResults.push(e):favouriteResults.pop(e),localStorage.setItem("data",JSON.stringify(favouriteResults)),paintFavList()}function paintFavList(){favouriteList.innerHTML="";for(let t=0;t<favouriteResults.length;t++){const e=favouriteResults[t].name,s=favouriteResults[t].img;favouriteList.innerHTML+=null!==s?`<li class="favourite_container__list--item data-name="${e}" data-img="${s}""> <img class="favourite_container__list--img" src="${s}"><h2 class="favourite_container__list--h2"> ${e} </h2> <span class="delete"> X </span> </li>`:'<li class="favourite_container__list--item"> <img class="favourite_container__list--img" src="https://via.placeholder.com/210x295/ffffff/666666/?" alt="Imagen no encontrada" <h2 class="results_container__list--h2"> </h2> <span class="delete"> X </span></li>'}const t=document.querySelectorAll(".delete");for(const e of t)e.addEventListener("click",deleteElementFromFavList)}function deleteElementFromFavList(t){const e=t.target.parentNode;favouriteResults.pop(e),paintFavList()}function resetAllResults(t){t.preventDefault(),allResultsList.innerHTML="",input.value="",allResults.splice(0,allResults.length)}function resetAllfav(t){t.preventDefault(),favouriteResults.innerHTML="",favouriteResults.splice(0,favouriteResults.length),localStorage.removeItem("data"),paintFavList()}getInfoFrom(),submitButton.addEventListener("click",getApiInformation),resetButton.addEventListener("click",resetAllResults),resetFav.addEventListener("click",resetAllfav);