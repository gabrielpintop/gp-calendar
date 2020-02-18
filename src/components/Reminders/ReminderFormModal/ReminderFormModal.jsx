import React, { useState } from 'react';
import Modal from 'react-modal';
import './ReminderFormModal.scss';
import { addReminder, updateReminder, deleteReminder } from '../../../services/reminders';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.5)';
Modal.setAppElement('#root');

const ReminderForm = ({ showModal, handleShowModal, reminder }) => {

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
        date: reminder.year ? new Date(reminder.year, reminder.month, reminder.day).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10),
        city: reminder.city || '',
        color: reminder.color || '#009D87'
    });

    const handleInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
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
        if (result) {
            handleShowModal(false, {}, { newYear: Number(dateElements[0]), newMonth: Number(dateElements[1]) - 1, newDay: Number(dateElements[2]) })
        } else {
            window.alert('There was an error while adding the reminder');
        }
    };

    const updateExistingReminder = (dateElements) => {

        const result = updateReminder(reminder.year, reminder.month, reminder.day, { ...form, id: reminder.id, year: Number(dateElements[0]), month: Number(dateElements[1]) - 1, day: Number(dateElements[2]) });
        if (result) {
            handleShowModal(false, {}, { newYear: Number(dateElements[0]), newMonth: Number(dateElements[1]) - 1, newDay: Number(dateElements[2]) })
        } else {
            window.alert('There was an error while updating the reminder');
        }
    };

    const handleDeleteReminder = () => {
        if (deleteReminder(reminder.year, reminder.month, reminder.day, reminder.id)) {
            handleShowModal(false, {});
        } else {
            window.alert('There was an error while deleting the reminder')
        }
    };

    return (
        <Modal isOpen={showModal} style={customStyles}>
            <div id="closeHeader"><i className="fas fa-times" onClick={() => handleShowModal(false, {})}></i></div>
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
                <button className="button-add margin-top-1 "><i className={`fas ${reminder.id ? 'fa-save' : 'fa-plus'}`} ></i>&nbsp;{reminder.id ? 'Save' : 'Create'}&nbsp;</button>
                {reminder.id && <button className="button-delete margin-top-1 float-right" type="button" onClick={handleDeleteReminder}><i className="fas fa-trash" ></i>&nbsp;Delete&nbsp;</button>}
            </form>
        </Modal>
    );
};

export default ReminderForm;