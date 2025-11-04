import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth0 } from '@auth0/auth0-react';


export default function Navbar() {
  const {user, isAuthenticated } = useAuth0();

console.log(user);


  return (
    <div className={styles.navbar}>
      <h1 className={styles.logo}>GenAI</h1>

      <div className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Image
        </NavLink>

        <NavLink
          to="/text"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Text
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          History
        </NavLink>
      </div>

      <div className={styles.navSignup}>
        <NavLink to="/signup" className={styles.signupBtn}>
        {isAuthenticated ? JSON.parse(localStorage.getItem("authUser")).name : 'SignUP'}
        </NavLink>
      </div>
    </div>
  );
}
