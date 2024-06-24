import styles from './cardproductdetail.module.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addCart } from '../../redux/slice/cartSlice';
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
import img from "../../assets/ảnh/14tim.jpg";
import imghotrenđing from "../../assets/ảnh/hottrending2.png";
import axios from 'axios';
import { getproductdetail } from '../../redux/slice/itemproductdetail';
import { addRecently } from '../../redux/slice/recentlyviewedSlice';
export default function CardProductDetail(props) {
    const [idpddetail, setIdpddetail] = useState(0);
    const productdetail = useSelector(state => state.itemproductdetail.itemproductdetail);
    const { ref: refTopTrendingProduct, inView: inViewTopTrendingProduct } = useInView({
        threshold: 0
    });
    const auth = useSelector(state => state.auth.authentication);
    const listrecently = useSelector(state => state.recentlyviewed.items);
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
    const movepageproductdetail = (id,item) => {
        // dispatch(addRecently(item));
        // console.log(listrecently);
        navigate(`/productdetail/${(id)}`);
    }
    console.log('check ishotrending: ', props.ishottrending);
    return (
        <>
            <div style={{marginBottom:'1rem' , width: '23%', margin: '0 auto',border : 'solid 1px #ccc' }} key={props.data.id} className={` ${props.animation ? 'animation-from-right' : 'animation-from-left'} `}>

                <div className={`${styles['item']}  `}>
                    {auth && (
                        <button className={`btn btn-primary ${styles['favotrite']}`} style={{ fontSize: '0.75rem', marginBottom: '1rem' }}><FontAwesomeIcon icon={faBookmark} /></button>
                    )}
                    <div onClick={() => { movepageproductdetail(props.data.id,props.data); }} className={`${styles['item-content']}  `}>
                        <div className={`${styles['item-img']}`} style={{ position: 'relative', width: '100%',height:"15rem" }}>
                            {props.ishottrending && (
                                <img className={`${styles['img-sticker']}`} src={imghotrenđing} />
                            )}
                            <img src={img} className={`${styles['img-product']}`} />
                        </div>

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

                            <div className={`${styles['item-price']}`}>{props.data.gia.toLocaleString('en-US')} VNĐ</div>
                        </div>


                    </div>
                    <button onClick={() => { addcart(props.data) }} style={{ width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: '#1abc9c' }} className="btn btn-success">Add to cart</button>
                </div>

            </div>

        </>
    );
}