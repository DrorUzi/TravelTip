'use strict';

export default {
    getLocs,
    getPosition,
    getGeocodeData
}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getGeocodeData(adress) {
    let prmGeocodeInfo = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=AIzaSyB7SzPNes4AjmRsbxennZQC5BjzyIeHHIQ`)
    let geocodeData = prmGeocodeInfo.then(prmData => {
        let relevantData = prmData.data.results[0]
        let locAdress = relevantData.formatted_address
        let locLatLng = relevantData.geometry.location
        return { adress: locAdress, latLng: locLatLng }
    })
    return geocodeData
}
