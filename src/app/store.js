import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import appointmentReducer from '../features/appointment/appointmentSlice';
import doctorReducer from '../features/doctor/doctorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer
  }
});

export default store;
