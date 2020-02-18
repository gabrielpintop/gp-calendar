import React from 'react';
import { deleteReminders } from '../../../services/reminders';

const ReminderDeleteAll = ({ month, year, day, updateReminders }) => {

    const handleRemindersDelete = () => {
        if (window.confirm(`Are you sure you want to delete all the reminders of "${day}/${month}/${year}"?`)) {
            if (deleteReminders(year, month, day)) {
                updateReminders(year, month, day);
                window.alert(`All the reminders of "${day}/${month}/${year}" were deleted`)
            } else {
                window.alert('There was an error while deleting the reminders');
            }
        }
    };

    return (
        <div id="reminderDeleteAll">
            <button className="button-delete" onClick={handleRemindersDelete}><i className="fas fa-trash"></i>&nbsp;Delete all</button>
        </div>
    );
};

export default ReminderDeleteAll;