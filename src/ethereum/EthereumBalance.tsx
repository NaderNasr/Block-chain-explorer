import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EthereumBalanceProps {
  address: string;
}

function EthereumBalance({ address }: EthereumBalanceProps) {
  const [balance, setBalance] = useState<string>('');
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
      )
      .then((response) => {
        const ether = Number(response.data.result) / 10 ** 18;
        setBalance(ether.toFixed(4));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [address]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '16px',
      }}
    >
      <h2>Current Balance: {balance} ETH</h2>
    </div>
  );
}

export default EthereumBalance;
