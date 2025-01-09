import React from 'react';
import LayerManager from './LayerManager'; // Импортируем LayerManager по умолчанию
import { LayersProvider } from './LayersProvider'; // Импортируем LayersProvider из правильного файла
import users from './usersData';
import { CloseButton } from 'components/common/Toast';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';


const App = () => {
  return (
    <div style={{ padding: '20px'}}>
      <LayersProvider users={users}>
        <LayerManager />
      </LayersProvider>
    </div>
  );
};

export default App;