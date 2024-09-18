const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
  const API_KEY = '63e048668e72d4106ef55a2838fe8935'; // USE your owm API_KEY
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.cod === '404') {
        cityHide.textContent = city;
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector(
        '.weather-details .humidity span'
      );
      const wind = document.querySelector('.weather-details .wind span');

      // Update weather data only if a different city is searched
      if (cityHide.textContent !== city) {
        cityHide.textContent = city;
        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        switch (data.weather[0].main) {
          case 'Clear':
            image.src = 'images/clear.png';
            break;
          case 'Rain':
            image.src = 'images/rain.png';
            break;
          case 'Snow':
            image.src = 'images/snow.png';
            break;
          case 'Clouds':
            image.src = 'images/cloud.png';
            break;
          case 'Mist':
          case 'Haze':
            image.src = 'images/mist.png';
            break;
          default:
            image.src = 'images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity} %`;
        wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;

        // Remove old clones if they exist
        removeClones();

        // Create new clones
        createClones();
      }
    });
});

// Function to create new clones
function createClones() {
  const infoWeather = document.querySelector('.info-weather');
  const infoHumidity = document.querySelector('.info-humidity');
  const infoWind = document.querySelector('.info-wind');

  const elCloneInfoWeather = infoWeather.cloneNode(true);
  const elCloneInfoHumidity = infoHumidity.cloneNode(true);
  const elCloneInfoWind = infoWind.cloneNode(true);

  elCloneInfoHumidity.id = 'clone-info-humidity';
  elCloneInfoHumidity.classList.add('active-clone');

  elCloneInfoWeather.id = 'clone-info-weather';
  elCloneInfoWeather.classList.add('active-clone');

  elCloneInfoWind.id = 'clone-info-wind';
  elCloneInfoWind.classList.add('active-clone');

  setTimeout(() => {
    infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
    infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
    infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
  }, 2200);
}

// Function to remove existing clones
function removeClones() {
  const existingWeatherClone = document.querySelector('#clone-info-weather');
  const existingHumidityClone = document.querySelector('#clone-info-humidity');
  const existingWindClone = document.querySelector('#clone-info-wind');

  if (existingWeatherClone) existingWeatherClone.remove();
  if (existingHumidityClone) existingHumidityClone.remove();
  if (existingWindClone) existingWindClone.remove();
}
