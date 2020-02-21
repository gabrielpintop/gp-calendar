import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ReminderFormModal.scss';
import { connect } from 'react-redux';
import { toggleModal, setRemindersAndDate } from '../../../actions';
import { getWeatherBasedOnCity } from '../../../services/weather';
import { addReminder, updateReminder, deleteReminder } from '../../../services/reminders';

const ReminderForm = (props) => {

    const { reminder, showModal, toggleModal, year, month, day, setRemindersAndDate } = props;

    const [loading, setLoading] = useState(false);

    const [weatherData, setWeatherData] = useState(null);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderColor: '#a42ef3'
        }
    };

    const [form, setValues] = useState({
        text: reminder.text || '',
        time: reminder.time || new Date().toLocaleTimeString().slice(0, 5),
        date: new Date(year, month, day).toISOString().substr(0, 10),
        city: reminder.city || '',
        color: reminder.color || '#009D87'
    });

    const handleInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const getCityWeather = () => {
        setLoading(true);
        getWeatherBasedOnCity(reminder.city).then(data => {
            setWeatherData(data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const dateElements = form.date.split('-');
        if (reminder.id) {
            updateExistingReminder(dateElements);
        } else {
            addNewReminder(dateElements);
        }
    };

    const addNewReminder = (dateElements) => {
        const result = addReminder(Number(dateElements[0]), Number(dateElements[1]) - 1, Number(dateElements[2]), form);
        if (result === true) {
            setRemindersAndDate({ year, month, day, showModal: false, reminder: {} });
        } else {
            window.alert(result);
        }
    };

    const updateExistingReminder = (dateElements) => {
        const result = updateReminder(year, month, day, { ...form, id: reminder.id, year: Number(dateElements[0]), month: Number(dateElements[1]) - 1, day: Number(dateElements[2]) });
        if (result) {
            setRemindersAndDate({ year, month, day, showModal: false, reminder: {} });
        } else {
            window.alert('There was an error while updating the reminder');
        }
    };

    const handleDeleteReminder = () => {
        if (deleteReminder(year, month, day, reminder.id)) {
            setRemindersAndDate({ year, month, day, showModal: false, reminder: {} });
        } else {
            window.alert('There was an error while deleting the reminder')
        }
    };

    useEffect(() => {
        if (reminder.id && reminder.city) {
            getCityWeather();
        }
    }, []);

    return (
        <Modal isOpen={showModal} style={customStyles}>
            <div id="closeHeader"><i className="fas fa-times" onClick={() => toggleModal({ showModal: false, reminder: {} })}></i></div>
            {reminder.id && <div className="weather-information">{loading ? <span className="loading-weather">Loading {reminder.city} weather...</span> : weatherData && <><img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt={weatherData.main}></img><span>{weatherData.main} in {reminder.city}</span></>}</div>}
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="text">Text</label>
                <input
                    id="text"
                    name="text"
                    className="form-control"
                    type="text"
                    value={form.text}
                    onChange={handleInput}
                    minLength="1"
                    maxLength="30"
                    required
                />
                <label className="label" htmlFor="date">Date</label>
                <input
                    id="date"
                    name="date"
                    className="form-control"
                    type="date"
                    value={form.date}
                    onChange={handleInput}
                    required
                />
                <label className="label" htmlFor="text">Time</label>
                <input
                    id="time"
                    name="time"
                    className="form-control"
                    type="time"
                    value={form.time}
                    onChange={handleInput}
                    required
                />

                <label className="label" htmlFor="city">City</label>
                <input
                    id="city"
                    name="city"
                    className="form-control"
                    type="text"
                    value={form.city}
                    onChange={handleInput}
                    maxLength="50"
                    required
                />
                <label className="label" htmlFor="color">Color</label>
                <input
                    id="color"
                    name="color"
                    className="form-control"
                    type="color"
                    value={form.color}
                    onChange={handleInput}
                    required
                />
                <small>*Do not choose light colors for better usability</small>
                <br />
                <button type="submit" className="button-add margin-top-1 "><i className={`fas ${reminder.id ? 'fa-save' : 'fa-plus'}`} ></i>&nbsp;{reminder.id ? 'Save' : 'Create'}&nbsp;</button>
                {reminder.id && <button className="button-delete margin-top-1 float-right" type="button" onClick={handleDeleteReminder}><i className="fas fa-trash" ></i>&nbsp;Delete&nbsp;</button>}
            </form>
        </Modal>
    );
};

const mapStateToProps = ({ showModal, reminder, year, month, day }) => {
    return {
        showModal,
        reminder,
        year,
        month,
        day
    };
};

const mapDispatchToProps = {
    toggleModal,
    setRemindersAndDate
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderForm);