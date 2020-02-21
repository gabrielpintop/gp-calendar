export const addReminder = (year, month, day, { id, text, time, city, color }) => {
    if (year === null || month === null || day === null) {
        return 'The dates of the reminder are not valid';
    } else if (!text) {
        return 'The text of the reminder is required';
    } else if (text.length > 30) {
        return 'Reminder length is not valid';
    } else if (!time) {
        return 'The time of the reminder is required';
    } else if (!city) {
        return 'The city of the reminder is required';
    } else if (!color) {
        return 'The color of the reminder is required';
    }

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
        id: id || new Date().getTime(),
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

export const getRemindersByYearAndMonth = (year, month) => {
    const reminders = JSON.parse(localStorage.getItem('GP_CALENDAR_STUFF'));
    if (reminders && reminders[year] && reminders[year][month]) {
        return reminders[year][month];
    } else {
        return {};
    }
};

export const updateReminder = (year, month, day, reminder) => {
    if (deleteReminder(year, month, day, reminder.id)) {
        return addReminder(reminder.year, reminder.month, reminder.day, reminder);
    } else {
        return false;
    }
};

export const deleteReminder = (year, month, day, id) => {
    try {
        const parsedReminders = JSON.parse(localStorage.getItem('GP_CALENDAR_STUFF'));
        if (parsedReminders) {
            const reminders = parsedReminders[year][month][day];
            const index = reminders.findIndex(reminder => reminder.id === id);
            if (index === -1) {
                return false;
            } else {

                reminders.splice(index, 1);
                parsedReminders[year][month][day] = reminders;
                localStorage.setItem('GP_CALENDAR_STUFF', JSON.stringify(parsedReminders));
                return true;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteReminders = (year, month, day) => {
    try {
        const parsedReminders = JSON.parse(localStorage.getItem('GP_CALENDAR_STUFF'));
        if (parsedReminders) {
            parsedReminders[year][month][day] = [];
            localStorage.setItem('GP_CALENDAR_STUFF', JSON.stringify(parsedReminders));
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getRemindersByYearMonthAndDay = (year, month, day) => {
    const reminders = getRemindersByYearAndMonth(year, month);

    if (reminders) {
        return reminders[day] || [];
    }
};