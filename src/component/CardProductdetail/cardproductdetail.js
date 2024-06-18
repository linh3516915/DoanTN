
import styles from './cardproductdetail.module.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addCart } from '../../redux/slice/cartSlice';
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
import img from "../../assets/ảnh/12tim.jpg";
export default function CardProductDetail(props) {
    const [isDisplayPopup, setIsDisplayPopup] = useState(false)
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
        console.log("checkdataa", item);
        dispatch(addCart(item));
        alert('add cart successfully');
    }
    console.log("check item cart", listcart);
    console.log("check totalQuantity", totalQuantity);
    console.log("check totalPrice", totalPrice);
    return (
        <>
            <div style={{ width: '20%' }} key={props.data.id} className={` ${props.animation ? 'animation-from-right' : 'animation-from-left'} `}>
                <div onClick={() => {
                    navigate(`/productdetail/${ (props.data.id)}`);
                }} className={`${styles['item']}  `}>

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