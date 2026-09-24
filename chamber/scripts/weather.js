// paste your OpenWeatherMap key here
const API_KEY = '9489975057ba99029972f29d912810cf';

// Hopkins, MN coordinates; units=imperial gives Fahrenheit
const LAT = 44.925;
const LON = -93.4058;
const BASE = 'https://api.openweathermap.org/data/2.5';
const PARAMS = `lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;

async function getWeather() {
    try {
        
        const [currentRes, forecastRes] = await Promise.all([
            fetch(`${BASE}/weather?${PARAMS}`),
            fetch(`${BASE}/forecast?${PARAMS}`)
        ]);

        
        if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather request failed');

        const current = await currentRes.json();
        const forecast = await forecastRes.json();

        displayCurrent(current);
        displayForecast(forecast, current.dt + current.timezone);
    } catch (error) {
        console.error(error);
        document.querySelector('#current-weather').textContent = 'Weather unavailable right now.';
    }
}

function displayCurrent(data) {
    
    const description = data.weather[0].description;
    document.querySelector('#current-weather').innerHTML = `
        <p class="temp">${Math.round(data.main.temp)}&deg;F</p>
        <p class="description">${description}</p>
    `;
}

function displayForecast(data, localNow) {
    
    const toLocal = (unix) => new Date((unix + data.city.timezone) * 1000);
    const todayKey = new Date(localNow * 1000).toISOString().slice(0, 10);

    
    const days = {};
    data.list.forEach((item) => {
        const local = toLocal(item.dt);
        const key = local.toISOString().slice(0, 10);
        if (key === todayKey) return; 

        const distance = Math.abs(local.getUTCHours() - 12);
        if (!days[key] || distance < days[key].distance) {
            days[key] = { distance, date: local, temp: item.main.temp };
        }
    });

    
    const forecastEl = document.querySelector('#forecast');
    forecastEl.innerHTML = '<h3>3-Day Forecast</h3>';
    Object.values(days).slice(0, 3).forEach((day) => {
        const label = day.date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
        forecastEl.innerHTML += `<p>${label}: ${Math.round(day.temp)}&deg;F</p>`;
    });
}

getWeather();