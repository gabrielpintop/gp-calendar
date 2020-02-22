import React from 'react';
import './CalendarContainer.scss';
import Calendar from '../../components/Calendar/Calendar';
import CalendarOptions from '../../components/CalendarOptions/CalendarOptions';
import DevelopedBy from '../../components/DevelopedBy/DevelopedBy';
import ReminderForm from '../../components/Reminders/ReminderFormModal/ReminderFormModal';
import { connect } from 'react-redux';
import SelectMonth from '../../components/CalendarOptions/SelectMonth/SelectMonth';

const CalendarContainer = (props) => {

    const { showModal } = props;

    return (
        <main id="calendarContainer">
            <div id="calendarView">
                <div className="show-sm">
                    <DevelopedBy />
                    <SelectMonth />
                </div>
                <Calendar />
                <CalendarOptions />
            </div>
            <div className="show-lg">
                <DevelopedBy />
            </div>
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