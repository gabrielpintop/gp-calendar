import React, { useEffect, useState } from 'react';

const SelectMonth = (props) => {

    const [{ day, month, year, changeDate }, setCurrentProps] = useState(props);

    useEffect(() => {
        setCurrentProps(props);
    }, [props]);

    const formatter = new Intl.DateTimeFormat('en', { month: 'long' });

    const calculateMonthName = () => {
        return formatter.format(new Date(year, month, day));
    };

    const changeMonth = (forward) => {
        if (forward) {
            if (month + 1 > 11) {
                changeDate(year + 1, 0, 1);
            } else {
                changeDate(year, month + 1, 1);
            }
        } else {
            if (month - 1 < 0) {
                changeDate(year - 1, 11, 1);
            } else {
                changeDate(year, month - 1, 1);
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

export default SelectMonth;