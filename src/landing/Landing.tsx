import React from 'react';
import styles from './landing.module.css';
import image from '../assets/Landing.png';
import Choice from '../choice/Choice';

const Landing: React.FC = () => {

  return (
    <>
      <div className={styles.container}>
          <>
            <div className={styles.textContainer}>
              <p className={styles.title}>Check Blockchain Transactions</p>
              <p className={styles.description}>
                Track cryptocurrency transactions with ease.
              </p>
              <Choice />
            </div>

            <div className={styles.imageContainer}>
              <img src={image} alt="landing page" />
            </div>
          </>
      </div>
    </>
  );
};

export default Landing;
