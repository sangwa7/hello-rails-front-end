import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllDoctorsView from './features/doctor/AllDoctorView';
import DoctorView from './features/doctor/DoctorView';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import NewAppointment from './components/NewAppointment';
import AllAppointments from './components/AllAppointments';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllDoctorsView />} />
        <Route path="/doctors/:doctorId" element={<DoctorView />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/appointments" element={<AllAppointments />} />
        <Route path="/create-appointment" element={<NewAppointment />} />
      </Routes>
    </div>
  );
}

export default App;
