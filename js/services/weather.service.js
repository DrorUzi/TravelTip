'use strict';

export default {
    getWeather
}

function getWeather(lat, lng) {
    let prm = axios.get(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=cdedac0cf3893bcce175970704b3af16`)
    let currWeather = prm.then(res => {
        let data = res.data;
        let resWeather = Object.values(data)
        return {
            description: resWeather[1][0].description,
            temp: resWeather[3].temp,
            clouds: resWeather[1][0].main,
            icon: resWeather[1][0].icon,
        }
    });
    return currWeather
}

