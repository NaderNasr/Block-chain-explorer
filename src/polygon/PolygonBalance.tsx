import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
polyAddress: string;
}

const PolygonBalance: React.FC<Props> = ({ polyAddress }) => {
const [balance, setBalance] = useState<string>('');
const apiKey = process.env.REACT_APP_POLYSCAN_API_KEY;

useEffect(() => {
axios.get(`https://api.polygonscan.com/api?module=account&action=balance&address=${polyAddress}&apikey=${apiKey}`)
.then(response => {
const ether = Number(response.data.result) / 10 ** 18;
setBalance(ether.toFixed(6));
})
.catch(error => {
console.log(error);
});
}, [polyAddress]);

return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
<h2>Current Balance: {balance} MATIC</h2>
</div>
);
}

export default PolygonBalance;