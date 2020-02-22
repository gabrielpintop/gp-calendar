import React from 'react';
import { connect } from 'react-redux';
import { setRemindersAndDate } from '../../../actions';
import './SelectMonth.scss';

const SelectMonth = (props) => {

    const formatter = new Intl.DateTimeFormat('en', { month: 'long' });

    const { day, month, year, setRemindersAndDate } = props;

    const calculateMonthName = () => {
        return formatter.format(new Date(year, month, day));
    };

    const changeMonth = (forward) => {
        if (forward) {
            if (month + 1 > 11) {
                setRemindersAndDate({ year: year + 1, month: 0, day: 1 });
            } else {
                setRemindersAndDate({ year, month: month + 1, day: 1 });
            }
        } else {
            if (month - 1 < 0) {
                setRemindersAndDate({ year: year - 1, month: 11, day: 1 });
            } else {
                setRemindersAndDate({ year, month: month - 1, day: 1 });
            }
        }
    };

    return (
        <div id="monthSelector" className="no-select">
            <h3>
                {month + '' + year !== '01970' ? <i className="fas fa-chevron-left" onClick={() => changeMonth(false)}></i> : <i>&nbsp;&nbsp;</i>}<i className="fas fa-chevron-right" onClick={() => changeMonth(true)}></i>
            </h3>
            <h3>&nbsp;{calculateMonthName()} - {year}</h3>
        </div>
    );
};

const mapStateToProps = ({ year, month, day }) => {
    return {
        year,
        month,
        day
    };
};

const mapDispatchToProps = {
    setRemindersAndDate
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectMonth);