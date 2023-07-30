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
// const getCountryData = function (country) {
//   //Country 1
//   countriesContainer.innerHTML = "";
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbours = data[0].borders;
//       console.log(neighbours);
//       if (!neighbours) return;

//       //Country 2
//       return neighbours.forEach((element) => {
//         fetch(`https://restcountries.com/v3.1/alpha/${element}`)
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error(`Country not found ${response.status}`);
//             }
//             return response.json();
//           })
//           .then((data) => {
//             renderCountry(data[0], "neighbour");
//           });
//       });
//     })
//     .catch((err) => {
//       console.log(`${err} 💥💥💥`),
//         renderErr(`Something went wrong 💥💥💥. ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  //Country 1
  countriesContainer.innerHTML = "";
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      const neighbours = data[0].borders;
      console.log(neighbours);
      if (!neighbours) throw new Error("No neighbour found");

      //Country 2
      return neighbours.forEach((element) => {
        getJSON(`https://restcountries.com/v3.1/alpha/${element}`).then(
          (data) => renderCountry(data[0], "neighbour")
        );
      });
    })
    .catch((err) => {
      console.log(`${err} 💥💥💥`), renderErr(`${err.message}. Try again!`);
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

// console.log("Test start");
// setTimeout(() => {
//   console.log("0 sec timer"), 0;
// });
// Promise.resolve("Resolved promise 1").then((res) => console.log(res));
// console.log("Test end");

/* 
 ! Creating new promise
 */
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You WIN 🤗");
    } else reject(new Error("You LOST 😩"));
  }, 2000);
});

lotteryPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));

/*
!Promisifying
*/
const wait = function (sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
};

wait(2).then(() => {
  console.log("I waited for 2 seconds");
  return wait(1).then(() => {
    console.log("I waited for 1 seconds");
  });
});
