import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from 'firebase/auth';

const initialState = {
  burger: false,
  formLoggedIn: {
    email: '',
    password: '',
    status: false,
  },
};

export const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    setBurger(state) {
      state.burger = !state.burger;
    },

    setFormLoggedIn(state, action) {
      state.formLoggedIn = action.payload;
    },
  },
});

export const { setBurger, setFormLoggedIn } = counterSlice.actions;
