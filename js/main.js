'use strict';
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'


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
}

document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
        });
    locService.getLatLng('raanana')
        .then(info => {
            console.log('info:', info)
        }
        )

})

document.querySelector('.search-btn').addEventListener('click', (ev) => {
    ev.preventDefault()
    let elSearchInput = document.querySelector('.search-input')
    locService.getGeocodeData(elSearchInput.value)
        .then(geocodeData => { 
            renderGeocodeData(geocodeData)
            elSearchInput.value = ''
         }
        )
        .catch('error getting geocode Data')
})

function renderGeocodeData(geocodeData) {
    document.querySelector('.adress').innerText = geocodeData.adress
    mapService.setMapCenter(geocodeData.latLng)
    mapService.setMapZoom(13)
}

