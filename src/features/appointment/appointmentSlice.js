import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../config';

const initialState = {
  appointments: [],
  appointment: {},
  loading: false
};

export const userAppointments = createAsyncThunk('appointment/userAppointments', async (user) => {
  const response = await fetch(`${api}appointments?user_id=${user}`);
  const data = await response.json();
  return data;
});

export const createAppointment = createAsyncThunk('appointment/createAppointment', async (data) => {
  const response = await fetch(`${api}appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ doctor_id: data.doctor_id, date: data.date, user_id: data.user_id })
  });
  const responseData = await response.json();
  return responseData;
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    });
    builder.addCase(createAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.appointment = action.payload;
    });
  }
});

export default appointmentSlice.reducer;
