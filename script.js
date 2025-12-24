const API_KEY = 'c90a62cf27a6483cbf060717251412';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherContent = document.getElementById('weatherContent');

const getWeatherIcon = (condition) => {
    // Map WeatherAPI condition text to emojis
    condition = condition.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle')) return '🌧️';
    if (condition.includes('thunder')) return '⛈️';
    if (condition.includes('snow')) return '❄️';
    if (condition.includes('cloud')) return '☁️';
    if (condition.includes('mist') || condition.includes('fog')) return '🌫️';
    return '☀️';
};

const getBackgroundClass = (condition) => {
    condition = condition.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) return 'rainy';
    if (condition.includes('snow')) return 'snowy';
    if (condition.includes('cloud')) return 'cloudy';
    return 'sunny';
};

const fetchWeather = async (city) => {
    loading.classList.add('show');
    weatherContent.classList.remove('show');
    error.classList.remove('show');
    searchBtn.disabled = true;

    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
        );

        const data = response.data;

        // Update UI
        document.getElementById('cityName').textContent = data.location.name;
        document.getElementById('country').textContent = data.location.country;
        document.getElementById('temp').textContent = `${Math.round(data.current.temp_c)}°`;
        document.getElementById('description').textContent = data.current.condition.text;
        document.getElementById('weatherIcon').textContent = getWeatherIcon(data.current.condition.text);
        document.getElementById('humidity').textContent = `${data.current.humidity}%`;
        document.getElementById('wind').textContent = `${Math.round(data.current.wind_kph)} km/h`;
        document.getElementById('pressure').textContent = `${data.current.pressure_mb} hPa`;
        document.getElementById('visibility').textContent = `${data.current.vis_km} km`;
        document.getElementById('feelsLike').textContent = `${Math.round(data.current.feelslike_c)}°`;
        document.getElementById('tempMin').textContent = `${Math.round(data.current.temp_c - 2)}°`; // WeatherAPI doesn't provide min/max in current weather
        document.getElementById('tempMax').textContent = `${Math.round(data.current.temp_c + 2)}°`;

        // Set background
        document.body.className = getBackgroundClass(data.current.condition.text);

        loading.classList.remove('show');
        weatherContent.classList.add('show');
    } catch (err) {
        loading.classList.remove('show');
        error.classList.add('show');
        setTimeout(() => error.classList.remove('show'), 3000);
        console.error(err);
    } finally {
        searchBtn.disabled = false;
    }
};

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});

// Load initial weather
fetchWeather('India');
