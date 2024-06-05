
import styles from './cardproductdetail.module.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addCart } from '../../redux/slice/cartSlice';
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
export default function CardProductDetail(props) {
    const [isDisplayPopup, setIsDisplayPopup] = useState(false)
    const { ref: refTopTrendingProduct, inView: inViewTopTrendingProduct } = useInView({
        threshold: 0
    });
    const listcart = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state=>state.cart.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const test = () => {
        navigate('/productdetail');
    }
    const addcart = (item) => {
        console.log("checkdataa", item);
        dispatch(addCart(item));
        alert('add cart successfully');
    }
    console.log("check item cart", listcart);
    console.log("check totalQuantity", totalQuantity);
    console.log("check totalPrice", totalPrice);
    return (
        <>

            <div ref={refTopTrendingProduct} id={props.id}  className={`mb-5 ${styles['product']} ${props.animation ? 'animation-from-right' : 'animation-from-left'}  ${inViewTopTrendingProduct ? 'animation-zoom-in' : ''}`} >
                <div onClick={() => { test() }} className={`mb-5 ${styles['product-content']}`}>
                    <div className={`${styles['image-warrper']} h-75`}>
                        <img
                            className="w-100 mb-3 h-100"
                            src={''}
                            alt={
                                ''
                            } />
                    </div>
                    <p className={`name text-center font-italic font-weight-900 font-family-Ubuntu mb-1`} style={{ fontSize: '11px' }}>{props.data.ten}</p>
                    <p className={`price text-center opacity-50 font-weight-light font-monospace`}>{props.data.gia} VND</p>
                </div>
                <>
                    <button onClick={() => { addcart(props.data) }} className='btn btn-secondary w-50 ' style={{ marginLeft: '25%', fontSize: '10px' }}>Add cart</button>
                </>
            </div>
        </>
    );
}