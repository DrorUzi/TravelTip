'use strict';

export default {
    initMap,
    addMarker,
    panTo,
    setMapCenter,
    setMapZoom
}

var map;

export function initMap(lat =35.6895, lng = 139.6917) {
    return _connectGoogleApi()
    .then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 10
            })
        console.log('Map!', map);
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng( lat,  lng);
    map.panTo(laLatLng);
    map.setZoom(15);
    addMarker(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAPFB8GIj5b1g3LvHgh3ZIyI5OL_AxczOc'; 
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
function setMapCenter(latLng){
    map.setCenter(latLng)
}
function setMapZoom(zoom){
    map.setZoom(zoom)
}


