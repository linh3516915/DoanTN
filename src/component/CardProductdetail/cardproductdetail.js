import styles from './cardproductdetail.module.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faClose, faShoppingCart, faStar, faStarAndCrescent, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { addCart } from '../../redux/slice/cartSlice';
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
import img from "../../assets/ảnh/13den.jpg";
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
    const addcart = (item) => {
        dispatch(addCart(item));
        alert('add cart successfully');
    }
    const movepageproductdetail = (id, item) => {
        navigate(`/productdetail/?name=${encodeURIComponent(id)}`);
    }
    console.log('check ishotrending: ', props.ishottrending);
    let datastar = [];
    const liststar = [1, 2, 3, 4, 5].map((number, index) => {
        if (Math.floor(props.data.so_sao) >= number) {
            datastar.push(
                <div
                   // key={index}
                    className={` ${styles['icon-star']} `}
                // onClick={() => { setHoverIndex(index); setDisavled(true); }}

                >
                    <FontAwesomeIcon icon={faStar} />
                </div>
            )
        }

        return (
            < FontAwesomeIcon icon={faStarHalfStroke} />

        )
    })
    if ((props.data.so_sao - Math.floor(props.data.so_sao)) >= 0.1 && (props.data.so_sao - Math.floor(props.data.so_sao)) <= 0.9) {
        datastar.push(
            <div
                // key={index}
                className={` ${styles['icon-star']} `}
            // onClick={() => { setHoverIndex(index); setDisavled(true); }}

            >
                < FontAwesomeIcon icon={faStarHalfStroke} />
            </div>
        )
    }
        for (let i = 0; i < 5 - Math.ceil(props.data.so_sao); i++) {
            datastar.push(
                <div
                    // key={i}
                    className={` ${styles['icon-star']} `}
                // onClick={() => { setHoverIndex(index); setDisavled(true); }}
                    style={{color : '#ccc'}}
                >
                    <FontAwesomeIcon icon={faStar} />
                </div>
            )
        }
    return (
        <>
            <div style={{ marginBottom: '0rem', width: '20%', border: '1px solid rgb(223 223 223)' }} key={props.data.id} className={` ${props.animation ? 'animation-from-right' : 'animation-from-left'} `}>

                <div className={`${styles['item']}  `}>
                    {auth && (
                        <button className={`btn btn-primary ${styles['favotrite']}`} style={{ fontSize: '0.75rem', marginBottom: '1rem' }}><FontAwesomeIcon icon={faBookmark} /></button>
                    )}
                    <div onClick={() => { movepageproductdetail(props.data.ten, props.data); }} className={`${styles['item-content']}  `}>
                        <div className={`${styles['item-img']}`} style={{ position: 'relative', width: '100%', height: "12rem" }}>
                            {props.ishottrending && (
                                <img className={`${styles['img-sticker']}`} src={imghotrenđing} />
                            )}
                            <img src={img} className={`${styles['img-product']}`} />
                        </div>

                        <div style={{ padding: "10px" }}>
                            <div class="product-wid-rating" style={{display : 'flex'}}>
                                {datastar}
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