import React from 'react';
import { deleteReminders } from '../../../services/reminders';
import { connect } from 'react-redux';
import { setRemindersAndDate } from '../../../actions';

const ReminderDeleteAll = (props) => {

    const { month, year, day, setRemindersAndDate } = props;

    const handleRemindersDelete = () => {
        if (window.confirm(`Are you sure you want to delete all the reminders of "${day}/${month}/${year}"?`)) {
            if (deleteReminders(year, month, day)) {
                setRemindersAndDate({ year, month, day, showModal: false });
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

const mapStateToProps = ({ reminders, year, month, day }) => {
    return {
        reminders,
        year,
        month,
        day
    };
};

const mapDispatchToProps = {
    setRemindersAndDate
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderDeleteAll);