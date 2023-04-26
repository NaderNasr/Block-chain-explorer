import React, { useEffect, useState } from 'react';
import Transactions from './Transactions';
import { dummyDataPoly } from './DummyData';

type Props = {
  apiKey: string;
};

const Explorer = (props: Props) => {
  const [data, setData] = useState<any[]>(dummyDataPoly);

  console.log('DATA', data);

  return (
    <>
      <Transactions polyTransactions={data?.slice(0, 5)} />
    </>
  );
};

export default Explorer;
