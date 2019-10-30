'use strict';

// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cdedac0cf3893bcce175970704b3af16

export default {
    getWeather
}

function getWeather(lat, lon) {
    let prm = axios.get('http://api.openweathermap.org/data/2.5/weather?lat=35.6895&lon=139.6917&units=metric&APPID=cdedac0cf3893bcce175970704b3af16')
    let currWeather = prm.then(res => {
        // console.log('1' ,res.data)
        let data = res.data;
        let resWeather = Object.values(data)
        // console.log(resWeather[1][0].description);
        return {
            description: resWeather[1][0].description,
            temp: resWeather[3].temp,
            clouds:resWeather[1][0].main,
            icon: resWeather[1][0].icon,
        }
    });
    return currWeather
}

