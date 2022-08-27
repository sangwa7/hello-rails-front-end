import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signUp } from '../features/user/userSlice';
import './form.css';

const RegisterForm = () => {
  const userExists = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const name = useRef('name');
  const email = useRef('email');
  const inputHandler = (e) => {
    e.preventDefault();
    const user = {
      name: name.current.value,
      email: email.current.value
    };
    dispatch(signUp(user));
  };

  useEffect(() => {
    if (userExists && userExists.success) {
      nav('/');
    }
  }, [userExists]);
  return (
    <div className="form-container">
      <form onSubmit={inputHandler} className="main-form reg-form ">
        <input type="text" ref={name} placeholder="User Name" required />
        <input type="email" ref={email} placeholder="Email" required />
        <button type="submit"> Sign Up </button>
      </form>
    </div>
  );
};

export default RegisterForm;
