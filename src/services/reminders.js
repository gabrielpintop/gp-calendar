const addReminder = (year, month, day, { text, time, city, color }) => {
    let reminders = {};
    try {
        const parsedReminders = JSON.parse(localStorage.getItem('GP_CALENDAR_STUFF'));
        if (parsedReminders) {
            reminders = parsedReminders;
        }
    } catch (error) {
        console.log(error);
    }

    const reminder = {
        id: `${year}-${month - 1}-${day}-${new Date().getTime()}`,
        text,
        time,
        city,
        color
    };

    if (!reminders[year]) {
        reminders[year] = {
            [month]: {
                [day]: [reminder]
            }
        };
    } else if (!reminders[year][month]) {
        reminders[year][month] = {
            [day]: [reminder]
        }
    } else if (!reminders[year][month][day]) {
        reminders[year][month][day] = [reminder];
    } else {
        reminders[year][month][day].push(reminder);
        reminders[year][month][day].sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
    }

    localStorage.setItem('GP_CALENDAR_STUFF', JSON.stringify(reminders));
    return true;
};

const getRemindersByYearAndMonth = (year, month) => {
    const reminders = JSON.parse(localStorage.getItem('GP_CALENDAR_STUFF'));
    if (reminders && reminders[year] && reminders[year][month]) {
        return reminders[year][month];
    } else {
        return {};
    }
};

const getRemindersByYearMonthAndDay = (year, month, day) => {
    const reminders = getRemindersByYearAndMonth(year, month);

    if (reminders) {
        return reminders[day] || [];
    }
};

module.exports = {
    getRemindersByYearAndMonth,
    getRemindersByYearMonthAndDay,
    addReminder
}