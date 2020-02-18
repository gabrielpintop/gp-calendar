const { getRemindersByYearMonthAndDay } = require('../services/reminders');

export const toggleModal = payload => ({
  type: 'TOGGLE_MODAL',
  payload,
});

export const defineReminder = payload => ({
  type: 'DEFINE_REMINDER',
  payload,
});

export const changeDate = payload => ({
  type: 'CHANGE_DATE',
  payload,
});

export const setRemindersAndDate = payload => {
  payload.reminders = getRemindersByYearMonthAndDay(payload.year, payload.month, payload.day);
  return {
    type: 'SET_REMINDERS_AND_DATE',
    payload
  }
};