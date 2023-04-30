import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function TwoBoxes() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose an option</h2>
      <div className={styles.boxContainer}>
        <Link to="/home" className={styles.landingButton}>
          Ethereum
        </Link>

        <Link to="/polygon" className={styles.landingButton}>
          Polygon
        </Link>
        <Link to="/metamask" className={styles.landingButton}>
          Connect to Meta Mask
        </Link>
      </div>
    </div>
  );
}

export default TwoBoxes;
