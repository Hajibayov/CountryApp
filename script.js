"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
/////////////////////////////
//XMLHttpRequest (old method)
// //For rendering countries
const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
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

const renderErr = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

// function getCountryAndNeighbour(country){
//   //Ajax call country 1
// const request = new XMLHttpRequest();
// request.open('GET',`https://restcountries.com/v3.1/name/${country}`)
// request.send()
// console.log(request.responseText)

// request.addEventListener('load',function(){
//     //Destucturing
//     const [data] = JSON.parse(this.responseText)
//     console.log(data)

//     //Render country 1
//     renderCountry(data)

//     //Get neighbour country 2
//     const neighbour = data.borders
//     console.log(neighbour)

//     if(!neighbour) return
//     //Ajax call country 2
//     neighbour.forEach(function(element){
//     const request2 = new XMLHttpRequest();
//     request2.open('GET',`https://restcountries.com/v3.1/alpha/${element}`)
//     request2.send()

//     request2.addEventListener('load',function(){
//       const [data] = JSON.parse(this.responseText)
//       console.log(data)

//         //Render country 2

//       renderCountry(data, 'neighbour')
//     })
//     })

// })
// }
// getCountryAndNeighbour('azerbaijan')

// const request = new XMLHttpRequest();
// request.open('GET',`https://restcountries.com/v3.1/name/${country}`)
// request.send()

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`)

// const getCountryData = function (country){
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then((response)=>{
//   console.log(response)
//   return response.json()
//     }).then((data)=>{
//       console.log(data)
//       renderCountry(data[0])
//     })
// }

const getCountryData = function (country) {
  //Country 1
  countriesContainer.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbours = data[0].borders;
      console.log(neighbours);
      if (!neighbours) return;

      //Country 2
      return neighbours.forEach((element) => {
        fetch(`https://restcountries.com/v3.1/alpha/${element}`)
          .then((response) => response.json())
          .then((data) => {
            renderCountry(data[0], "neighbour");
          });
      });
    })
    .catch((err) => {
      console.log(`${err} 💥💥💥`),
        renderErr(`Something went wrong 💥💥💥. ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  let input = document.getElementById("text").value;
  getCountryData(input);
  input = document.getElementById("text").value = "";
});
