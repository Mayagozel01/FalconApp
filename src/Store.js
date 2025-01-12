import { configureStore } from '@reduxjs/toolkit';
import layersReducer from './layersSlice';

const store = configureStore({
    reducer: {
        layers: layersReducer,
    },
});

export default store;