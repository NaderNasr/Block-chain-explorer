import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { convertToMatic, convertToGwei } from '../utils/convertValues';

interface Transaction {
  hash: string;
  value: number;
  timeStamp: number;
  gasPrice: number;
  gasUsed: number;
  to: string;
  from: string;
  txreceipt_status: number;
  isError: number;
  currentPage: number;
  pageNumbers: number[];
  handleClick: (event: React.MouseEvent<HTMLAnchorElement>, pageNumber: number) => void;
}

interface Props {
  polyTransactions: Transaction[];
}

function PolygonTransactionList({ polyTransactions }: Props): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('⬇');
  const transactionsPerPage: number = 15;
  const totalPages: number = Math.ceil(
    polyTransactions.length / transactionsPerPage
  );

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number
  ): void => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const handleSort = () => {
    if (sortOrder === '⬇') {
      setSortOrder('⬆');
    } else {
      setSortOrder('⬇');
    }
  };

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  let sortedTransactions = [...polyTransactions];
  if (sortOrder === '⬇') {
    sortedTransactions.sort((a, b) => b.value - a.value);
  } else {
    sortedTransactions.sort((a, b) => a.value - b.value);
  }

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <h2>Transaction List</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                Amount <button onClick={handleSort}>{sortOrder}</button>
              </th>
              <th>Timestamp</th>
              <th>Gas Price</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {!currentTransactions && (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            )}
            {currentTransactions.map((transaction, index) => (
              <tr key={transaction.hash}>
                <td>{convertToMatic(transaction.value)}</td>
                <td>{moment.unix(transaction.timeStamp).format('LLL')}</td>
                <td>{convertToGwei(transaction.gasPrice)}</td>
                <td>
                  <Link
                    to={`/polygonDetails/${transaction?.hash}?gasPrice=${transaction.gasPrice}&value=${transaction.value}&gasUsed=${transaction.gasUsed}&gasPrice=${transaction.gasPrice}&timeStamp=${transaction.timeStamp}&to=${transaction.to}&from=${transaction.from}&txreceipt_status=${transaction.txreceipt_status}&isError=${transaction.isError}`}
                  >
                    Learn More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
      {pageNumbers.map((pageNumber) => (
        <a
          key={pageNumber}
          className={pageNumber === currentPage ? styles.active : ''}
          onClick={(event) => handleClick(event, pageNumber)}
        >
          {pageNumber}
        </a>
      ))}
    </div>
    </div>
  );
}

export default PolygonTransactionList;
