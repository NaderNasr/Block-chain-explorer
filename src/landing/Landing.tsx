import React from 'react';
import styles from './landing.module.css';
import image from '../assets/Landing.png';
import Choice from '../choice/Choice';

const Landing: React.FC = () => {
  const isMobile = window.innerWidth <= 1200; // adjust breakpoint as needed

  return (
    <>
      <div className={styles.container}>
        {isMobile ? (
          <>
            <div className={styles.textContainer}>
              <p>Check your blockchain transactions</p>
            </div>
          </>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Landing;
