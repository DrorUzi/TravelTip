'use strict';
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'

window.onload = () => {
    if(checkUrlParams()){
        let latLng =checkUrlParams()
        mapService.initMap(latLng.lat,latLng.lng)
        .then(()=>{
            mapService.setMapZoom(14)
            mapService.addMarker(latLng)
        })
        .catch(() => {
            renderRejectMsg('Init map error!')
        });
    }
    else mapService.initMap()
        .catch(() => {
            renderRejectMsg('Init map error!')
        });

}

document.querySelector('.my-loc-btn').addEventListener('click', () => {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            renderWeather(pos.coords.latitude, pos.coords.longitude)
            document.querySelector('.adress').innerText = 'Your current location'
        })
        .catch(() => {
            renderRejectMsg('Error getting current position!')
        })
})

document.querySelector('.search-btn').addEventListener('click', (ev) => {
    ev.preventDefault()
    let elSearchInput = document.querySelector('.search-input')
    locService.getGeocodeData(elSearchInput.value)
        .then(geocodeData => {
            renderGeocodeData(geocodeData)
            renderWeather(geocodeData.latLng.lat, geocodeData.latLng.lng)
            elSearchInput.value = ''
            let latLng = { lat: geocodeData.latLng.lat, lng: geocodeData.latLng.lng }
            mapService.updategLastLoc(latLng)
        })
        .catch(() => {
            renderRejectMsg('Error getting geocode data!')
        })
})

document.querySelector('.copy-btn').addEventListener('click', () => {
    copyToClipboard()
})

function renderGeocodeData(geocodeData) {
    let elContainer = document.querySelector('.loc-header');
    let strHtml = `Locaition: <span class="adress">${geocodeData.adress}</span>`;
    elContainer.innerHTML = strHtml
    mapService.setMapCenter(geocodeData.latLng)
    mapService.setMapZoom(13)
}

// TODO design to the weather section  
function renderWeather(lat, Lng) {
    weatherService.getWeather(lat, Lng)
        .then(res => {
            let elContainer = document.querySelector('.weather');
            let strHtml =
                `<h3>Wehater is: ${res.description}</h3>
                <h4>clouds: ${res.clouds}</h4>
                <h4>Temp: ${res.temp}</h4>
                <img src="http://openweathermap.org/img/wn/${res.icon}@2x.png">`;
            elContainer.innerHTML = strHtml
        })
}

function renderRejectMsg(msg) {
    var locHeader = document.querySelector('.loc-header')
    locHeader.innerHTML = msg
    setTimeout(() => {
        locHeader.innerHTML = '<h3 class="loc-header">Locaition: <span class="adress"></span></h3>'
    }, 5000);
}

function copyToClipboard() {
    let currLoc = mapService.getgLastLoc()
    if (!currLoc) {
        renderRejectMsg('No location to copy!')
        return
    }
    let currLocUrl =  `https://droruzi.github.io/TravelTip?lat=${currLoc.lat}&lng=${currLoc.lng}`
    let elTextArea = document.createElement('textarea');
    document.body.appendChild(elTextArea);
    elTextArea.value = currLocUrl
    elTextArea.select();
    elTextArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(elTextArea);
}

function checkUrlParams() {
    let urlCheck = new URLSearchParams(window.location.search);
    let latParam = urlCheck.get('lat');
    let lngParam = urlCheck.get('lng');
    if (latParam && lngParam) {
        let latLng = { lat: +latParam, lng: +lngParam }
        return latLng
    }
    return false
}