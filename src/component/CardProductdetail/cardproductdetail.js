
import styles from './cardproductdetail.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useInView } from "react-intersection-observer";
export default function CardProductDetail(props) {
    const [isDisplayPopup, setIsDisplayPopup] = useState(false)
    const { ref: refTopTrendingProduct, inView: inViewTopTrendingProduct } = useInView({
        threshold: 0
    });
    const displayPopupProduct = () => {
        setIsDisplayPopup(true);
    }

    const closePopupProduct = () => {
        setIsDisplayPopup(false);
    }
    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
    console.log("checkdataa",props.dat);
    return (
        <>
            <div ref={refTopTrendingProduct} id={props.id} className={`mb-5 ${styles['product']}  ${inViewTopTrendingProduct ? 'animation-zoom-in' : ''}` } >
                <div className={`${styles['image-warrper']} h-75`}>
                    <img
                        className="w-100 mb-3 h-100"
                        src={''}
                        alt={
                            ''
                        } />
                </div>
                <p className={`name text-center font-italic font-weight-900 font-family-Ubuntu mb-1`} style={{fontSize : '11px'}}>{props.data.ten}</p>
                <p className={`price text-center opacity-50 font-weight-light font-monospace`}>{props.data.gia} VND</p>
                
            </div>
            
        </>
    );
}