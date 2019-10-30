'use strict';
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    mapService.initMap()
        // .then(() => {
        //     mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        // })
        .catch(console.log('INIT MAP ERROR'));


    // locService.getPosition()
    //     .then(pos => {
    //         console.log('User position is:', pos.coords);

    //     })
        // .catch(err => {
        //     console.log('err!!!', err);
        // })
        weatherService.getWeather()
        renderWeather()
            
}

document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
        });

})


function renderWeather(){
    weatherService.getWeather()
        .then(res => {
            let elContainer = document.querySelector('.weather');
            let strHtml = `<h3>Wehater is: ${res.description}</h3>
                           <h4>clouds: ${res.clouds}</h4>
                           <h4>Temp: ${res.temp}</h4>
                           <img src="http://openweathermap.org/img/wn/${res.icon}@2x.png">`;
            elContainer.innerHTML = strHtml
        })
}