import React from 'react';
import Calendar from './containers/CalendarContainer/CalendarContainer';
import Modal from 'react-modal';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.5)';

const App = () => {
  return <Calendar />;
}

export default App;
