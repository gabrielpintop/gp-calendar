import React from 'react';
import './CalendarContainer.scss';
import Calendar from '../../components/Calendar/Calendar';
import CalendarOptions from '../../components/CalendarOptions/CalendarOptions';
import DevelopedBy from '../../components/DevelopedBy/DevelopedBy';
import ReminderForm from '../../components/Reminders/ReminderFormModal/ReminderFormModal';
import { connect } from 'react-redux';

const CalendarContainer = (props) => {

    const { showModal } = props;

    return (
        <main id="calendarContainer">
            <div id="calendarView">
                <Calendar />
                <CalendarOptions />
            </div>
            <DevelopedBy />
            {showModal && <ReminderForm />}
        </main>
    );
}

const mapStateToProps = ({ showModal, reminders }) => {
    return {
        showModal,
        reminders
    };
};

export default connect(mapStateToProps, null)(CalendarContainer);