const axios = require('axios').default;
const api = 'https://api.openweathermap.org/data/2.5/weather?appid=d2ec863eaa2321925fed4d433208447b&q=';

const getWeatherBasedOnCity = (city) => {
    return new Promise((resolve, reject) => {
        axios.get(`${api}${city}`).then(({ data }) => {
            if (data.weather && data.weather[0]) {
                resolve(data.weather[0]);
            } else {
                reject(false);
            }
        }).catch(err => {
            console.log(err);
            reject(false);
        });
    });
};

module.exports = {
    getWeatherBasedOnCity
}
