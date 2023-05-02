import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import logo from '../assets/EtherAction.png';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <Link to='/' className={styles.link}>
          <img src={logo} alt='logo' className={styles.logo} />
        </Link>
      </div>
      <a href='https://www.nadernasr.ca' className={styles.button}>Made with 🫶 Nader Nasr</a>
    </div>
  );
}

export default Navbar;
