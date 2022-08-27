import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../config';

const initialState = {
  doctors: [],
  doctor: {},
  loading: false,
  dp: []
};

export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', async () => {
  const response = await fetch(`${api}doctors`);
  const doctors = await response.json();
  return doctors;
});

export const fetchSingleDoctor = createAsyncThunk('doctor/fetchSingleDoctor', async (id) => {
  const response = await fetch(`${api}doctors/${id}`);
  const doctor = await response.json();
  return doctor;
});

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    displayPagination: (state, action) => {
      state.dp = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchSingleDoctor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleDoctor.fulfilled, (state, action) => {
      state.doctor = action.payload;
      state.loading = false;
      state.error = '';
    });
  }
});
export default doctorSlice.reducer;
