import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImTwitter, ImFacebook, ImGooglePlus, ImVimeo, ImPinterest } from 'react-icons/im';
import styles from './Navbar.module.css';
import { userLogout } from '../features/user/userSlice';

const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userLoggedIn = useSelector((state) => state.user.user);
  const [user, setUser] = useState('null');

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    setUser(userLoggedIn);
  }, [userLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUser(localStorage.getItem('username'));
    } else setUser('');
  }, [user]);

  const logout = () => {
    nav('/');
    setUser('');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    dispatch(userLogout());
  };

  if (menu) {
    return (
      <span className={styles.hamburger} onClick={() => toggleMenu()}>
        <GiHamburgerMenu />
      </span>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <p>Doctor&apos;s hub</p>
        <span className={styles.closeBtn} onClick={() => toggleMenu()}>
          <BiLeftArrow />
        </span>
      </div>
      <div className={styles.navlinks}>
        <NavLink to="/" onClick={() => toggleMenu()}>
          Doctors
        </NavLink>
        <NavLink to="/appointments" onClick={() => toggleMenu()}>
          Appointments
        </NavLink>
        <NavLink to="/create-appointment" onClick={() => toggleMenu()}>
          Reserve appointment
        </NavLink>
        {!user ? (
          <>
            <NavLink to="/login" onClick={() => toggleMenu()}>
              LOG IN
            </NavLink>
            <NavLink to="/register" onClick={() => toggleMenu()}>
              SIGN UP
            </NavLink>
          </>
        ) : (
          ''
        )}
      </div>
      <div className={styles.footer}>
        {user ? (
          <button
            type="button"
            className={styles.logoutbtn}
            onClick={() => {
              logout(), toggleMenu();
            }}>
            Logout
          </button>
        ) : (
          ''
        )}

        <div className={styles.icons}>
          <span>
            <ImTwitter />
          </span>
          <span>
            <ImFacebook />
          </span>
          <span>
            <ImGooglePlus />
          </span>
          <span>
            <ImVimeo />
          </span>
          <span>
            <ImPinterest />
          </span>
        </div>
        <div className={styles.footerText}>
          <p>&copy 2022 Max hospitals group </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
