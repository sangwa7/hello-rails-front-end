import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAppointments } from '../features/appointment/appointmentSlice';
import './allappointments.css';
import Loader from './loader/Loader';

const AllAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const [userId, setUserId] = useState();
  const loading = useSelector((state) => state.appointment.loading);

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      setUserId(+localStorage.getItem('user_id'));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(userAppointments(userId));
    }
  }, [userId]);

  if (!localStorage.getItem('user_id')) {
    return (
      <div className="newAppointment-warning">
        <h2>Please login to make an appointment</h2>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="body-holder">
      <div className="content">
        <h2>Booked Appointments</h2>
        <div className="card">
          {appointments.map((appointment) => (
            <div className="card-holder" key={appointment.id}>
              <h3>{appointment.doctor.name}</h3>
              <img src={appointment.doctor.photo} alt={`doctor${appointment.id}`} />
              <p>{appointment.date.split('T')[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
