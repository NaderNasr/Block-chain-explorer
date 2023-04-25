import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Ethereum</Link>
        <Link to="/polygon" className={styles.link}>Polygon</Link>
      </div>
      <a href='https://www.nadernasr.ca' className={styles.button}>Made with 🫶 by Nader Nasr</a>
    </div>
  );
}

export default Navbar;
