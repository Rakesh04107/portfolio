// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Export actions
export const { increment } = counterSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
