import React from 'react';
import styles from './styles.module.css';

function TwoBoxes() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose an option</h2>
      <div className={styles.boxContainer}>
        <a href="/home" className={styles.landingButton}>
          Ethereum
        </a>
        <a href="/polygon" className={styles.landingButton}>
          Polygon
        </a>
        <a href="/metamask" className={styles.landingButton}>
          Connect to Meta Mask
        </a>
      </div>
    </div>
  );
}

export default TwoBoxes;
