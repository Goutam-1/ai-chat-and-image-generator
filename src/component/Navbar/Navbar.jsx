import React from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import axios from "axios";
import styles from './Navbar.module.css';



export default function Navbar() {
    const navigate=useNavigate()
const logout= async ()=>{
 try{     
  const res=  await axios.post("http://localhost:8080/logout",{},{
          withCredentials:true})
        if(res.status===200){
          navigate("/")
        }
        
  
  }catch(err){
    console.log(err);
    
  }
}


  return (
    <div className={styles.navbar}>
      <h1 className={styles.logo}>GenAI</h1>

      <div className={styles.navLinks}>
        <NavLink
          to="/image"
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
         <button onClick={logout}>LogOUt</button>
      </div>
    </div>
  );
}
