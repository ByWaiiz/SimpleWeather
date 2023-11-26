const form = document.getElementById("form");

function changeWeather(city) {
  const APIKEY = "";
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;

  let temp = document.getElementById("temp");
  let cname = document.getElementById("cname");
  let temp2 = document.getElementById("temp2");
  let vent = document.getElementById("vent");
  let visi = document.getElementById("visi");
  let humi = document.getElementById("humi");

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log("Données météo de Paris:", data);

      temp.innerText = Math.round(data.main.temp) + "°";
      cname.innerText = data.name; //+ " " + data.sys.country;
      temp2.innerText = Math.round(data.main.feels_like) + "°";
      vent.innerText = Math.round(data.wind.speed) + " km/h";
      visi.innerText = data.visibility / 1000 + " km";
      humi.innerText = data.main.humidity + "%";
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données météo:", error);
    });
}

changeWeather("forbach");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityName = document.getElementById("ville");
  let checkCityName = new RegExp("[a-zA-Z]");

  if (checkCityName.test(cityName.value)) {
    changeWeather(cityName.value);
  } else {
    console.log("Le nom votre ville contient un caractère spécial!!");
  }
});
