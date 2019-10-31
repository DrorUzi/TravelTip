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
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=AIzaSyB7SzPNes4AjmRsbxennZQC5BjzyIeHHIQ`)
        .then(prmData => (
            {
                adress: prmData.data.results[0].formatted_address,
                latLng: prmData.data.results[0].geometry.location
            }
        ))
}