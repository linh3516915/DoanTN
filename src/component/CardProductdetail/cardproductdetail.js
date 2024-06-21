import styles from './cardproductdetail.module.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addCart } from '../../redux/slice/cartSlice';
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
import img from "../../assets/ảnh/12tim.jpg";
import axios from 'axios';
import { getproductdetail } from '../../redux/slice/itemproductdetail';
export default function CardProductDetail(props) {
    const [idpddetail, setIdpddetail] = useState(0);
    const productdetail = useSelector(state => state.itemproductdetail.itemproductdetail);
    const { ref: refTopTrendingProduct, inView: inViewTopTrendingProduct } = useInView({
        threshold: 0
    });
    const listcart = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const test = () => {
        navigate('/productdetail');
    }
    const addcart = (item) => {
        dispatch(addCart(item));
        alert('add cart successfully');
    }
    const movepageproductdetail = (id) => {
        navigate(`/productdetail/${(id)}`);
    }
    return (
        <>
            <div style={{ width: '20%' , margin : '0 auto' }} key={props.data.id} className={` ${props.animation ? 'animation-from-right' : 'animation-from-left'} `}>
                <div onClick={() => { movepageproductdetail(props.data.id); }} className={`${styles['item']}  `}>

                    <img src={img} />
                    <div style={{ padding: "10px" }}>
                        <div class="product-wid-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div style={{ marginBottom: '15px', height: "2rem" }}>
                            <h6 className={`${styles['item-name']}`} >{props.data.ten}</h6>
                        </div>

                        <div className={`${styles['item-price']}`}>{props.data.gia} VNĐ</div>
                    </div>


                </div>
                <button onClick={() => { addcart(props.data) }} style={{ width: '100%', marginTop: '10px', marginBottom: '20px', backgroundColor: '#1abc9c' }} className="btn btn-success">Add to cart</button>
            </div>

        </>
    );
}