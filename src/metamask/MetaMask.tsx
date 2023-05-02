import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Transaction } from 'web3-core';
import styles from './MetaMask.module.css';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const MetaMask = () => {
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
  const [title, setTitle] = useState<string>('Connect to Meta Mask');

  const [noExtension, setNoExtension] = useState<string>('');
  const token = uuidv4();
  const connectToMetaMask = async () => {
    try {
      await window.ethereum.enable();
      setNoExtension('');
      setConnected(true);
      Cookies.set('sessionToken', token, { expires: 7 });
    } catch (error) {
      console.log(error);
      setNoExtension('MetaMask extension not found');
    }
  };

  useEffect(() => {
    const token = Cookies.get('sessionToken');
    if (token) {
      setConnected(true);
      setTitle('Connected!');
    }

    const getAccount = async () => {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
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

  const SignOut = () => {
    Cookies.remove('sessionToken');
    setConnected(false);
    setTitle('Connect to Meta Mask');
  };

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
      <h1 className={styles.title}>{title}</h1>
      {connected && (
        <button onClick={() => SignOut()} className={styles.signOut}>
          Sign out
        </button>
      )}
      {noExtension && <p>{noExtension}</p>}

      {!connected && (
        <button onClick={connectToMetaMask} className={styles.signIn}>
          Connect to MetaMask
        </button>
      )}
      {connected && (
        <>
          <div className={styles.container}>
            <div className={styles.box}>
              <p className={styles.text}>
                <strong>Account:</strong> <br /> {account}
              </p>
            </div>
            <div className={styles.box}>
              <p className={styles.text}>
                <strong>Balance:</strong> <br /> {balance} ETH
              </p>
            </div>
          </div>

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
