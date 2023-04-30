import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Transaction } from 'web3-core';

type MetaMaskProps = {
  title: string;
};

const MetaMask = ({ title }: MetaMaskProps) => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<
    {
      hash: string;
      from: string;
      to: string | null;
      value: number;
    }[]
  >([]);

  const [noExtension, setNoExtension] = useState<string>('');

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.enable();
      setNoExtension('');
      setConnected(true);
    } catch (error) {
      console.log(error);
      setNoExtension('MetaMask extension not found');
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      // console.log('accounts',accounts);
      setAccount(accounts[0]);
    };

    const getBalance = async () => {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(Number(web3.utils.fromWei(balance, 'ether')));
    };

    const getTransactions = async () => {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const userTransaction = await web3.eth.getTransaction(accounts[0]);
      // console.log('userTransaction', userTransaction);
      const transactions = Array.isArray(userTransaction)
        ? userTransaction
        : [userTransaction];
      const formattedTxs = transactions.map((tx: Transaction) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: Number(web3.utils.fromWei(tx.value, 'ether')),
      }));
      setTransactions(formattedTxs);
    };

    if (connected) {
      getAccount();
      getBalance();
      getTransactions();
    }
  }, [connected]);

  // console.log(transactions);

  return (
    <div
      style={{
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins',
        flexDirection: 'column',
      }}
    >
      <h1>{title}</h1>
      {noExtension && <p>{noExtension}</p>}

      {!connected && (
        <button onClick={connectToMetaMask}>Connect to MetaMask</button>
      )}
      {connected && (
        <>
          <p>Account: {account}</p>
          <p>Balance: {balance} ETH</p>
          {transactions.length > 0 ? (
            <>
              <h2>Transaction History</h2>
              <ul>
                {transactions.map((tx) => (
                  <li key={tx.hash}>
                    <p>Hash: {tx.hash}</p>
                    <p>From: {tx.from}</p>
                    <p>To: {tx.to ?? 'Contract Creation'}</p>
                    <p>Value: {tx.value} ETH</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p>No Transactions</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MetaMask;
