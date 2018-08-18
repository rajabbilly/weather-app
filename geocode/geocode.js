const request = require('request');

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDJbm-IxtlqfuE3GDkqK4Cz1rbJwM_9ezg&address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            //Connection problem (Google Server Error)
            callback('Unabdle to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            //Invalid address (Address Errors)
            callback('Unable to find that address');
        } else if (body.status === 'OK') {
            //If all went ok 
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;