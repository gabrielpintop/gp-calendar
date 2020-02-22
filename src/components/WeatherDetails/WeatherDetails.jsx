import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getWeatherBasedOnCity } from '../../services/weather';
import './WeatherDetails.scss';

const WeatherDetails = (props) => {

    const { reminder } = props;

    const [loading, setLoading] = useState(true);

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getCityWeather = () => {
            setLoading(true);
            getWeatherBasedOnCity(props.reminder.city).then(data => {
                setWeatherData(data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            });
        };

        if (props.reminder.id && props.reminder.city) {
            getCityWeather();
        }
    }, [props]);

    return (
        <div className="weather-information no-select">
            {loading ?
                <span className="loading-weather">Loading {reminder.city} weather...</span>
                : weatherData &&
                <>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt={weatherData.main}></img>
                    <span>{weatherData.main} in {reminder.city}</span>
                </>
            }
        </div>
    );

};

const mapStateToProps = ({ reminder }) => {
    return {
        reminder
    };
};

export default connect(mapStateToProps, null)(WeatherDetails);
