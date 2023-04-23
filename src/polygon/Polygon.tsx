import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import PolygonBalance from './PolygonBalance';
import PolygonTransactionList from './PolygonTransactionList';

interface PolygonProps {}

const Polygon: React.FC<PolygonProps> = () => {
  const [polyTransactions, setPolyTransactions] = useState<any[]>([]);
  const [polyAddress, setPolyAddress] = useState<string>('');
  const apiKey: string = process.env.REACT_APP_POLYSCAN_API_KEY || '';

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPolyAddress(event.target.value);
  };

  useEffect(() => {
    if (polyAddress) {
      axios
        .get(
          `https://api.polygonscan.com/api?module=account&action=txlist&address=${polyAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`
        )
        .then(response => {
          setPolyTransactions(response.data.result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [polyAddress, apiKey]);

  return (
    <div>
      <div>
        <div>
          <h1 className={styles.title}>Polygon Address Transactions</h1>
          <label className={styles.label}>
            <span>Enter a Polygon address:</span>
            <input type="text" value={polyAddress} onChange={handleAddressChange} className={styles.input} />
          </label>

          {polyAddress ? (
            <div>
              <PolygonBalance polyAddress={polyAddress} />
              <PolygonTransactionList polyTransactions={polyTransactions} />
            </div>
          ) : (
            <p className={styles.titleAlert}>Please enter a Polygon address</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Polygon;
