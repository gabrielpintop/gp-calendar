import { addReminder } from '../../services/reminders';

describe('Service: addReminder', () => {

    const newReminder = {
        text: 'New reminder to add',
        time: '12:00',
        city: 'Bogota',
        color: '#009D87'
    };

    beforeAll(() => {
        localStorage.clear();
    });

    test('should return error because of invalid dates', () => {
        expect(addReminder(null, null, null, {})).toEqual('The dates of the reminder are not valid');
    });

    test('should return error because of missing text', () => {
        expect(addReminder(2020, 2, 21, {})).toEqual('The text of the reminder is required');
    });

    test('should return error because of long reminder text', () => {
        expect(addReminder(2020, 2, 21, { text: 'Testing the reminders with long text' })).toEqual('Reminder length is not valid');
    });

    test('should return error because of missing time', () => {
        expect(addReminder(2020, 2, 21, { text: newReminder.text })).toEqual('The time of the reminder is required');
    });

    test('should return error because of missing city', () => {
        expect(addReminder(2020, 2, 21, { text: newReminder.text, time: newReminder.time })).toEqual('The city of the reminder is required');
    });

    test('should return error because of missing color', () => {
        expect(addReminder(2020, 2, 21, { text: newReminder.text, time: newReminder.time, city: newReminder.city })).toEqual('The color of the reminder is required');
    });

    test('should add a new Reminder', () => {
        const year = 2020;
        const month = 1;
        const day = 20;
        let reminders = localStorage.getItem('GP_CALENDAR_STUFF');
        expect(reminders).toEqual(null);
        expect(addReminder(year, month, day, newReminder)).toBe(true);
        reminders = localStorage.getItem('GP_CALENDAR_STUFF');
        expect(reminders).not.toBe(null);
        const reminder = JSON.parse(reminders)[year][month][day][0];
        expect(reminder).not.toBe(null);
        expect(reminder.text).toEqual(newReminder.text);
        expect(reminder.time).toEqual(newReminder.time);
        expect(reminder.city).toEqual(newReminder.city);
        expect(reminder.color).toEqual(newReminder.color);
    });

    afterAll(() => {
        localStorage.clear();
    });

});


