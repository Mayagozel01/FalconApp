import { createSlice, nanoid } from "@reduxjs/toolkit";
import users from "usersData";

const initialState = {
  layouts:
    users.layoutsOrder?.map((layout: any) => ({
      ...layout,
      id: generateNumericId(),
      width: layout.width, // Set default width
      height: layout.height, // Set default height
    })) || [],
    isActive: false || [],
  loading: false,
  error: null,
};

function generateNumericId() {
  try {
    return nanoid();
  } catch (error) {
    console.error("Error generating numeric ID:", error);
    return `${Date.now()}-${Math.random()}`;
  }
}

const layoutsSlice = createSlice({
  name: "layouts",
  initialState,
  reducers: {
    setLayouts: (state, action) => {
      state.layouts = action.payload;
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
    addLayout: {
      reducer(state, action) {
        state.layouts.push(action.payload);
      },
      prepare(originalLayout) {
        return {
          payload: {
            ...originalLayout,
            id: generateNumericId(),
            x: (originalLayout.x || 0) + 20, // Optional: Set default x position
            y: (originalLayout.y || 0) + 20, // Optional: Set default y position
            width: originalLayout.width || 100, // Set default width
            height: originalLayout.height || 100, // Set default height
            isActive: false, 
          },
          meta: {},
          error: {},
        };
      },
    },
    updateLayout: (state, action) => {
      const { id, width, height, cells } = action.payload;
      const index = state.layouts.findIndex((layout) => layout.id === id);
      if (index !== -1) {
        state.layouts[index] = {
          ...state.layouts[index],
          width: width || state.layouts[index].width,
          height: height || state.layouts[index].height,
          cells: cells || state.layouts[index].cells,
        };
      }
    },
    deleteLayout: (state, action) => {
      state.layouts = state.layouts.filter(
        (layout) => layout.id !== action.payload
      );
    },
    toggleLayoutActive: (state, action: { payload: string }) => {
      const activeId = action.payload;

     
      state.layouts.forEach((layout) => {
        layout.isActive = false;
      });

      
      const activeLayout = state.layouts.find((layout) => layout.id === activeId);
      if (activeLayout) {
        activeLayout.isActive = true;
      }
    },
  },
});

export const {
  setLayouts,
  setLoading,
  setError,
  addLayout,
  updateLayout,
  deleteLayout,
  toggleLayoutActive,
} = layoutsSlice.actions;
export default layoutsSlice.reducer;
