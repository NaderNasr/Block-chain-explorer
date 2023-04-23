import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Navbar(): JSX.Element {
  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Ethereum</Link>
        <Link to="/polygon" className={styles.link}>Polygon</Link>
      </div>
    </div>
  );
}

export default Navbar;
