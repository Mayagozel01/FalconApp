import { createSlice, nanoid } from '@reduxjs/toolkit';
import users from './usersData';

const initialState = {
  layers: users.layoutsOrder?.map((layout) => ({
    ...layout,
    id: generateNumericId(),
    width: layout.width || '200', // Set default width
    height: layout.height || '350', // Set default height
  })) || [],
  loading: false,
  error: null,
};

function generateNumericId() {
  try {
    return nanoid();
  } catch (error) {
    console.error('Error generating numeric ID:', error);
    // Fallback to a timestamp to ensure uniqueness
    return `${Date.now()}-${Math.random()}`;
  }
}

const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    setLayers: (state, action) => {
      state.layers = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLayer: {
      reducer(state, action) {
        state.layers.push(action.payload);
      },
      prepare(originalLayer) {
        return {
          payload: {
            ...originalLayer,
            id: generateNumericId(),
            x: (originalLayer.x || 0) + 20, // Optional: Set default x position
            y: (originalLayer.y || 0) + 20, // Optional: Set default y position
            width: originalLayer.width || 100, // Set default width
            height: originalLayer.height || 100, // Set default height
          },
        };
      },
    },
    updateLayer: (state, action) => {
      const { id, width, height } = action.payload;
      const index = state.layers.findIndex((layer) => layer.id === id);
      if (index !== -1) {
        state.layers[index] = {
          ...state.layers[index], // Preserve existing properties
          width,
          height,
        };
      }
    },
    deleteLayer: (state, action) => {
      state.layers = state.layers.filter((layer) => layer.id !== action.payload);
    },
  },
});

export const {
  setLayers,
  setLoading,
  setError,
  addLayer,
  updateLayer,
  deleteLayer,
} = layersSlice.actions;
export default layersSlice.reducer;