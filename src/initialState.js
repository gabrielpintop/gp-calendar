import { getRemindersByYearMonthAndDay } from './services/reminders';
const date = new Date();
const reminders = getRemindersByYearMonthAndDay(date.getFullYear(), date.getMonth(), date.getDate());

export default {
    showModal: false,
    reminder: {},
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    reminders
};
