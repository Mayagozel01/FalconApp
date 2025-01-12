import { CloseButton } from 'components/common/Toast';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';



import React from 'react';
import LayerManager from './LayerManager';
import { Provider } from 'react-redux'; // Import Provider
import store from './Store'; // Import your Redux store
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './style.css'

const App = () => {
  return (
    <Provider store={store}> {/* Wrap your app with the Redux Provider */}
      <div className='app'>
        <LayerManager />
      </div>
    </Provider>
  );
};

export default App;