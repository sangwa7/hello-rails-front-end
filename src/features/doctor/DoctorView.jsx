import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';

import './doctors.css';
// import Loader from '../../components/Loader';
import { fetchSingleDoctor } from './doctorSlice';

const DoctorView = () => {
  const nav = useNavigate();
  const doctor = useSelector((state) => state.doctor.doctor);
  // const loading = useSelector((state) => state.doctor.loading);
  const dispatch = useDispatch();
  const { doctorId } = useParams();
  useEffect(() => {
    dispatch(fetchSingleDoctor(doctorId));
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div className="doctorView-container">
      <p className="p2">
        <button type="button" onClick={() => nav(-1)} className="pg-btn pg-btn-left">
          <BiLeftArrow />
        </button>
      </p>
      <div className="doctorView-subContainer">
        <div className="doctorView-image-container">
          <img src={doctor.photo} alt={doctor.name} className="doctorView-image" />
        </div>
        <div className="doctorView-info">
          <h2>{doctor.name}</h2>
          <p style={{ fontWeight: 'bold', marginTop: '.75rem' }}>{doctor.speciality}</p>
          <div className="p1">
            <p>Price: $</p>
            <p>{doctor.price}</p>
          </div>
          <h3 style={{ textAlign: 'left', fontWeight: 'bold', marginTop: '1.25rem' }}>Bio</h3>
          <p className="doctor-bio">{doctor.bio}</p>
          <Link to="/create-appointment" className="doctorView-reserve">
            Book An Appointment ➡️
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
