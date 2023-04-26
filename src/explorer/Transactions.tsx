import React, { useState } from 'react';
import styles from './styles.module.css';
import { convertToMatic } from '../utils/convertValues';
import moment from 'moment';

interface Transaction {
  value: number;
  timeStamp: number;
  to: string;
  from: string;
  handleClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => void;
}

interface Props {
  polyTransactions: Transaction[];
}

function Transactions({ polyTransactions }: Props): JSX.Element {
  const [sortOrder, setSortOrder] = useState<string>('⬇');
  const [trans, setTrans] = useState<Transaction[]>(polyTransactions);
  console.log(trans);
  const handleSort = () => {
    if (sortOrder === '⬇') {
      setSortOrder('⬆');
    } else {
      setSortOrder('⬇');
    }
  };

  let sortedTransactions: Transaction[] = [...trans];
  if (sortOrder === '⬇') {
    sortedTransactions.sort((a, b) => b.value - a.value);
  } else {
    sortedTransactions.sort((a, b) => a.value - b.value);
  }

  return (
    <div className={styles.container}>
      <h2>Transactions from: {}</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                Amount <button onClick={handleSort}>{sortOrder}</button>
              </th>
              <th>Timestamp</th>
              <th>To</th>
            </tr>
          </thead>
          {String(polyTransactions) === 'Error! Invalid address format' ||
          polyTransactions.length === 0 ? (
            <tbody>
              <tr>
                <td>Invalid address</td>
              </tr>
            </tbody>
          ) : (
            <>
              <tbody>
                {!sortedTransactions ? (
                  <tr>
                    <td colSpan={5}>Loading...</td>
                  </tr>
                ) : (
                  sortedTransactions?.map((transaction, index) => (
                      <tr key={index}>
                      <td>{convertToMatic(transaction.value)}</td>
                      <td>{moment.unix(transaction?.timeStamp).format('LLL')}</td>
                      <td>{transaction?.to}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
}

export default Transactions;
