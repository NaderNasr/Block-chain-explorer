import React from 'react';
import styles from './styles.module.css';

const NotFound: React.FC = () => {
return (
<div className={styles.container}>
<h1>404 Not Found</h1>
<p>Hmm, looks like we couldn't find that page. Maybe it's lost in the blockchain somewhere?</p>
<p>Or maybe a group of crypto kitties hijacked it for their latest NFT project!</p>
</div>
);
}

export default NotFound;