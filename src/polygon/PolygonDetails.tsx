import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { convertToMatic, convertToGwei } from '../utils/convertValues';
import moment from 'moment';

function PolygonDetails(): JSX.Element {
  const [transaction, setTransaction] = useState<any>(null); // Replace 'any' with appropriate interface
  const { hash } = useParams<{ hash: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gasPrice = searchParams.get('gasPrice');
  const value = searchParams.get('value');
  const timeStamp = searchParams.get('timeStamp');
  const confirmations = searchParams.get('txreceipt_status');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;

  useEffect(() => {
    axios.get(`https://api-sepolia.etherscan.io/api?module=account&action=txlistinternal&txhash=${hash}&apikey=${apiKey}`)
      .then(response => {
        console.log('API response:', response);
        setTransaction(response.data.result);
      })
      .catch(error => {
        console.log('API error:', error);
      });
  }, []);

  if (!transaction) {
    return (
      <div>Loading transaction details...</div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backButton}>Back</Link>
        <h2>Transaction Details</h2>
      </header>
      <div className={styles.grid}>
        <div className={styles.item}>
          <p><strong>Time Stamp:</strong> {moment.unix(Number(timeStamp)).format('LLL')}</p>
        </div>
        <div className={styles.item}>
          <p><strong>Value:</strong> {convertToMatic(Number(value))}</p>
        </div>
        <div className={styles.item}>
          <p><strong>Gas Price:</strong> {convertToGwei(Number(gasPrice))}</p>
        </div>
        <div className={styles.item}>
          <p><strong>Confirmation status:</strong> {confirmations ? 'Success' : 'Failed'}</p>
        </div>
        <div className={styles.item}>
          <p><strong>From:</strong> {from}</p>
        </div>
        <div className={styles.item}>
          <p><strong>To:</strong> {to}</p>
        </div>
      </div>
    </div>
  );
}

export default PolygonDetails;
