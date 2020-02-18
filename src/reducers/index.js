const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            {
                const { showModal, reminder } = action.payload;
                return {
                    ...state,
                    showModal,
                    reminder
                };
            }
        case 'DEFINE_REMINDER':
            return {
                ...state,
                showModal: true,
                reminder: action.payload
            };
        case 'SET_REMINDERS_AND_DATE':
            {
                const { reminders, year, month, day, showModal, reminder } = action.payload;
                return {
                    ...state,
                    reminders,
                    showModal,
                    reminder: reminder || {},
                    year,
                    month,
                    day
                };
            }
        default:
            return state;
    }
};

export default reducer;
