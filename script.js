async function getWeather() {
    const apiKey = 'YOUR_API_KEY';
    const city = document.getElementById('city').value;
    const weatherBox = document.getElementById('weather-box');
    const errorBox = document.getElementById('error-box');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            errorBox.innerText = 'City not found. Please try again.';
            errorBox.classList.remove('hidden');
            weatherBox.classList.add('hidden');
        } else {
            const uvResponse = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`);
            const uvData = await uvResponse.json();

            let uvIndex;
            if (uvData.value < 3) {
                uvIndex = 'Low';
            } else if (uvData.value < 6) {
                uvIndex = 'Moderate';
            } else if (uvData.value < 8) {
                uvIndex = 'High';
            } else if (uvData.value < 11) {
                uvIndex = 'Very High';
            } else {
                uvIndex = 'Extreme';
            }

            document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('wind').innerText = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
            document.getElementById('humidity').innerText = `${data.main.humidity}%`;
            document.getElementById('uv-index').innerText = uvIndex;
            document.getElementById('sunrise').innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('sunset').innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            errorBox.classList.add('hidden');
            weatherBox.classList.remove('hidden');
        }
    } catch (error) {
        errorBox.innerText = 'Something went wrong. Please try again.';
        errorBox.classList.remove('hidden');
        weatherBox.classList.add('hidden');
    }
}
