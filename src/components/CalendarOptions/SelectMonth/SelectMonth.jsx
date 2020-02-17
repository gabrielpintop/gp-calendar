import React, { useEffect, useState } from 'react';

const SelectMonth = (props) => {

    const [{ day, month, year, setMonth, setYear, setDay }, setCurrentProps] = useState(props);

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
                setYear(year + 1);
                setDay(1);
                setMonth(0);
            } else {
                setDay(1);
                setMonth(month + 1);
            }
        } else {
            if (month - 1 < 0) {
                setYear(year - 1);
                setDay(1);
                setMonth(12);
            } else {
                setMonth(month - 1);
                setDay(1);
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