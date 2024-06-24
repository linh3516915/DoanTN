import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import styles from './relatedproducts.module.css'
function Relatedproducts() {
    return (
        <>
            <div className={`${styles['main']}`}>
                đây là Relatedproducts
            </div>
        </>
    );
}

export default Relatedproducts;