const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDJbm-IxtlqfuE3GDkqK4Cz1rbJwM_9ezg&address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unabdle to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    }); 
}

var getWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/5839e2515c5da8fcd56d1b939880de2a/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to Forecast.io server');
            } else if (response.statusCode === 400) {
                reject('Unable to feth weather');
            } else {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }
        });
    });
}

geocodeAddress('1301 lombard street').then((res) => {
    console.log(res.address);
    return getWeather(res.latitude, res.longitude);
}).then ((res) => {
    console.log(`It's currently ${res.temperature}. It feels like ${res.apparentTemperature}.`);
}).catch((errorMessage) => {
    console.log(errorMessage);
});