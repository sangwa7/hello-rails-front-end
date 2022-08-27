import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

import { fetchDoctors } from './doctorSlice';
import Loader from '../../components/loader/Loader';
import './doctors.css';

const AllDoctorView = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const loading = useSelector((state) => state.doctor.loading);
  const [doctorsNumber, setDoctorsNumber] = useState([0, 3]);
  const [displayDoctors, setDisplayDoctors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  const handleDoctors = () => {
    if (doctors && doctorsNumber[0] === 0) {
      setDisplayDoctors(doctors.slice(doctorsNumber[0], doctorsNumber[1]));
    }
    if (doctors && doctorsNumber[0] > 0) {
      setDisplayDoctors(doctors.slice(doctorsNumber[0], doctorsNumber[1]));
    }
  };

  useEffect(() => {
    handleDoctors();
  }, [doctors]);

  useEffect(() => {
    handleDoctors();
  }, [doctorsNumber]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="allDoctors-container">
      <h2 className="allDoctors-heading">All Available Doctors</h2>
      <p className="allDoctors-script">Please select a doctor</p>
      <div className="displayDoctors-container">
        <p>
          <button
            type="button"
            className="pg-btn pg-btn-left"
            onClick={() => setDoctorsNumber([0, 3])}
            disabled={doctorsNumber[0] === 0}>
            <BiLeftArrow />
          </button>
        </p>
        <div className="allDoctors-subcontainer">
          {displayDoctors.map((doctor) => (
            <div key={doctor.id} className="item">
              <Link to={`/doctors/${doctor.id}`} className="allDoctors-each-doctor">
                <img src={doctor.photo} alt={doctor.name} className="allDoctors-doctor-photo" />
                <h4>{doctor.name}</h4>
                <p className="allDoctors-doctor-speciality">{doctor.speciality}</p>
              </Link>
            </div>
          ))}
        </div>
        <p>
          <button
            type="button"
            className="pg-btn pg-btn-right"
            onClick={() => setDoctorsNumber([3, 6])}
            disabled={doctorsNumber[1] === doctors.length}>
            <BiRightArrow />
          </button>
        </p>
      </div>
    </div>
  );
};

export default AllDoctorView;
