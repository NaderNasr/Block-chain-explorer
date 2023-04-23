import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EthereumBalance from './EthereumBalance';
import EthereumTransactionList from '../transactions/EthereumTransactionList';
import styles from './styles.module.css';

function Home(): JSX.Element {
  const [transactions, setTransactions] = useState<Array<any>>([]);
  const [address, setAddress] = useState<string>('');
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    if (address) {
      axios
        .get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${apiKey}`)
        .then(response => {
          setTransactions(response.data.result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [address, apiKey]);

  return (
    <div>
      <div>
        <div>
          <h1 className={styles.title}>Ethereum Address Transactions</h1>
          <label className={styles.label}>
            <span>Enter an Ethereum address:</span>
            <input type="text" value={address} onChange={handleAddressChange} className={styles.input} />
          </label>

          {address ? (
            <div>
              <EthereumBalance address={address} />
              <EthereumTransactionList transactions={transactions} />
            </div>
          ) : (
            <p className={styles.titleAlert}>Please enter an Ethereum address</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
