import React from 'react';
import styles from './LoadingSpinner.module.css'

function LoadingSpinner() {
    return (
        <div style={{width:'50%'}} className={`${styles['wrapper-loading']} d-flex justify-content-center align-items-center`}>
            <div className={`${styles['loadersmall']}`}></div>
        </div>
    );
}
export default LoadingSpinner;