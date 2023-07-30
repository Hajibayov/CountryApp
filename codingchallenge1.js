"use strict";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const images = document.querySelector(".images");

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
  countriesContainer.style.opacity = 1;
};

const renderERR = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=288623767679445758933x9293
//     `)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Problem with geocoding ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.country);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Country not found");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           renderCard(data[0]);
//         });
//     })
//     .catch((err) => {
//       renderERR(err.message);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   countriesContainer.innerHTML = "";
//   let inpLat = document.querySelector(".lat").value;
//   let inpLng = document.querySelector(".lng").value;
//   whereAmI(inpLat, inpLng);
//   inpLat = document.querySelector(".lat").value = "";
//   inpLng = document.querySelector(".lng").value = "";
// });
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const image = document.createElement("img");
//     image.src = imgPath;

//     image.addEventListener("load", () => {
//       images.append(image);
//       resolve(image);
//     });

//     image.addEventListener("error", () => {
//       reject(new Error("Image not found"));
//     });
//   });
// };
// let currentImg;
// createImage(
//   "https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// )
//   .then((image) => {
//     currentImg = image;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage(
//       "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     );
//   })
//   .then((image) => {
//     currentImg = image;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  //Geolocation
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse Geocoding
    const geo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=288623767679445758933x9293`
    );
    if (!geo) {
      throw new Error("Problem getting location data");
    }
    const dataGeo = await geo.json();
    console.log(dataGeo);
    //Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res) {
      throw new Error("Problem getting country");
    }
    const data = await res.json();
    console.log(data);
    renderCard(data[0]);
    //!Same as
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then((res) =>
    //   console.log(res)
    // );
  } catch (err) {
    renderERR(err);
  }
};

whereAmI();
console.log("First");
console.log('');
