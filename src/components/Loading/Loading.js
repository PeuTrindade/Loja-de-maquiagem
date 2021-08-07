import React from 'react';
import styles from './Loading.module.css';
import { AiOutlineLoading } from 'react-icons/ai';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <AiOutlineLoading/> 
        </div>
    )
}

export default Loading;
