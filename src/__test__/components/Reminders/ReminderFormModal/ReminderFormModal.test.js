import React from 'react';
import { mount } from 'enzyme';
import ReminderFormModal from '../../../../components/Reminders/ReminderFormModal/ReminderFormModal';
import Modal from 'react-modal';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as reminders from '../../../../services/reminders';
import EnzymeToJson from 'enzyme-to-json';

describe('ReminderFormModal component', () => {

    let store;
    let reminderFormModal;

    beforeAll(() => {
        const mockStore = configureStore();
        Modal.setAppElement('body');
        store = mockStore({
            showModal: true,
            reminder: {
                time: '15:00'
            },
            year: 2020,
            month: 1,
            day: 21,
            reminders: []
        });
    });

    beforeEach(() => {
        reminderFormModal = mount(<Provider store={store}><ReminderFormModal /></Provider>);
    });

    test('should match the snapshot', () => {
        expect(EnzymeToJson(reminderFormModal)).toMatchSnapshot();
    });

    test('should render', () => {
        expect(reminderFormModal.length).toEqual(1);
    });

    test('should have text input', () => {
        expect(reminderFormModal.find('#text').props().type).toEqual('text');
    });

    test('should have date input', () => {
        expect(reminderFormModal.find('#date').props().type).toEqual('date');
    });

    test('should have time input', () => {
        expect(reminderFormModal.find('#time').props().type).toEqual('time');
    });

    test('should have city input', () => {
        expect(reminderFormModal.find('#city').props().type).toEqual('text');
    });

    test('should have color input', () => {
        expect(reminderFormModal.find('#color').props().type).toEqual('color');
    });

    test('should have create button', () => {
        expect(reminderFormModal.find('button').length).toEqual(1);
    });

    test('should not call the method to submit calendar', () => {
        reminders.addReminder = jest.fn();
        reminderFormModal.find('form').simulate('submit');
        expect(reminders.addReminder).toHaveBeenCalledTimes(1);
    });

    test('should call the method to submit calendar', () => {
        reminders.addReminder = jest.fn();
        reminderFormModal.find('#text').instance().value = 'Add a reminder test';
        reminderFormModal.find('#text').simulate('change');
        reminderFormModal.find('#city').instance().value = 'Bogota';
        reminderFormModal.find('#city').simulate('change');
        reminderFormModal.find('form').simulate('submit');
        expect(reminders.addReminder).toHaveBeenCalledTimes(1);
    });
});