const date = new Date();
const { getRemindersByYearMonthAndDay } = require('./services/reminders');
const reminders = getRemindersByYearMonthAndDay(date.getFullYear(), date.getMonth(), date.getDate());

export default {
    showModal: false,
    reminder: {},
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    reminders
};
