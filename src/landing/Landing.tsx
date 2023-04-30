import React from 'react';
import styles from './styles.module.css';
import Choice from '../choice/Choice';

const Landing: React.FC = () => {
  const title: string = 'Check your blockchain transactions';
  const subtitle: string = 'Track your cryptocurrency transactions with ease.';
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.containerTitle}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <Choice />
    </>
  );
};

export default Landing;
