'use strict';

export default {
    getPosition,
    getGeocodeData
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
