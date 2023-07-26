"use strict";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCard = function (data) {
  const html = `
  <article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${+(
      data.population / 1000000
    ).toFixed(1)} M</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.keys(data.currencies)[0]
    }</p>
  </div>
</article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const renderERR = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=288623767679445758933x9293
    `)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Problem with geocoding ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.country);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Country not found");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          renderCard(data[0]);
        });
    })
    .catch((err) => {
      renderERR(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  countriesContainer.innerHTML = "";
  let inpLat = document.querySelector(".lat").value;
  let inpLng = document.querySelector(".lng").value;
  whereAmI(inpLat, inpLng);
  inpLat = document.querySelector(".lat").value = "";
  inpLng = document.querySelector(".lng").value = "";
});
