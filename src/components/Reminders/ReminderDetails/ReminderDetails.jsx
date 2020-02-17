import React from 'react';
const ReminderDetails = ({ reminder, handleShowModal, year, month, day }) => {
    return (
        <li className="reminder" onClick={() => handleShowModal(true, { ...reminder, year, month, day })}><span>{reminder.text}</span><span><i className="far fa-clock"></i>&nbsp;{reminder.time}</span></li>
    );

};

export default ReminderDetails;


