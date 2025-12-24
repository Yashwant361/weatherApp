const API_KEY =c90a62cf27a6483cbf060717251412
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherContent = document.getElementById('weatherContent');


const getWeatherIcon=(code) =>{
if(code >= 200 && code <300) return '⛈️';
if(code >= 300 && code <400) return '🌦️';
if(code >= 500 && code <600) return '🌧️';
if(code >= 600 && code <700) return '❄️';
if(code >= 700 && code <800) return '🌫️';
if(code === 800) return '☀️';
  return '🌧️';
};

const getBackgroundClass = (code)=>{

  if(code === 800 ) return 'sunny'
  if(code >= 200 && code < 600) return 'raniny'
  if(code >=600 && code <700) return 'snowy'
  return 'cloudy'
};

const fetchWeather = async(city) =>{
loading.classList.add ('show');
  weatherContent.classList.remove('show')
  error.classList.remove('show');
  searchBtn.disabled = true;

  try{
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=c90a62cf27a6483cbf060717251412&q=London&aqi=yes`
      );
const data = response.data;

        document.getElementById('cityName').textContent = data.name;
        document.getElementById('country').textContent = data.sys.country;
        document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('weatherIcon').textContent = getWeatherIcon(data.weather[0].id);
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
        document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°`;
        document.getElementById('tempMin').textContent = `${Math.round(data.main.temp_min)}°`;
        document.getElementById('tempMax').textContent = `${Math.round(data.main.temp_max)}°`;

        document.body.className = getBackgroundClass(data.weather[0].id);

        loading.classList.remove('show');
        weatherContent.classList.add('show');
    } catch (err) {
        loading.classList.remove('show');
        error.classList.add('show');
        setTimeout(() => error.classList.remove('show'), 3000);
    } finally {
        searchBtn.disabled = false;
    }
};

fetchWeather('London');