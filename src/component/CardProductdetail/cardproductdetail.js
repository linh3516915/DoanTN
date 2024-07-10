import styles from './cardproductdetail.module.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faClose, faShoppingCart, faStar, faStarAndCrescent, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { addCart } from '../../redux/slice/cartSlice';
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from 'react-redux';
import img from "../../assets/ảnh/11trang.jpg";
import imghotrenđing from "../../assets/ảnh/hottrending2.png";
import imgsale from "../../assets/ảnh//tải xuống (1).png";
import imgsoldout from "../../assets/ảnh/sold out.png";
import axios from 'axios';
import { getproductdetail } from '../../redux/slice/itemproductdetail';
import { addRecently } from '../../redux/slice/recentlyviewedSlice';
import { setsuccess } from '../../redux/slice/popupSlice';
export default function CardProductDetail(props) {
    const [idpddetail, setIdpddetail] = useState(0);
    const productdetail = useSelector(state => state.itemproductdetail.itemproductdetail);
    const { ref: refTopTrendingProduct, inView: inViewTopTrendingProduct } = useInView({
        threshold: 0
    });
    const auth = useSelector(state => state.auth.authentication);
    const isadmin = useSelector(state => state.auth.isAdmin);
    const listrecently = useSelector(state => state.recentlyviewed.items);
    const listcart = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addcart = (item) => {
        dispatch(addCart(item));
        dispatch(setsuccess(true));
    }
    const movepageproductdetail = (id, item) => {

        navigate(`/productdetail/?name=${encodeURIComponent(id)}`);
    }
    console.log('check dataaa: ', props.data);
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
                style={{ color: '#ccc' }}
            >
                <FontAwesomeIcon icon={faStar} />
            </div>
        )
    }
    return (
        <>
            <div style={{}} key={props.data.id} className={`${styles['product-item']} ${props.animation ? 'animation-from-right' : 'animation-from-left'} `}>

                <div className={`${styles['item']}  `}>
                    {/* {auth && !isadmin && (
                        <button className={`btn btn-primary ${styles['favotrite']}`} style={{ fontSize: '0.75rem', marginBottom: '1rem' }}><FontAwesomeIcon icon={faBookmark} /></button>
                    )} */}
                    <div style={{ display: 'flex' }}>
                        {auth && !isadmin && (
                            <button className={`btn btn-primary ${styles['favotrite']}`} style={{ fontSize: '0.75rem', marginBottom: '1rem' }}><FontAwesomeIcon icon={faBookmark} /></button>
                        )}
                        {props.data.phan_tram_giam == 0 && (
                            <>
                             <div style={{height:'46px', width: '100%',fontStyle:'italic', textAlign: 'end', color: 'red', fontWeight: '700', fontSize: '20px' }}><p></p> </div>
                            </>

                        )}
                        {props.data.phan_tram_giam != 0 && (
                            <>
                                <div style={{ width: '100%',fontStyle:'italic', textAlign: 'end', color: 'red', fontWeight: '700', fontSize: '20px' }}><p>-{props.data.phan_tram_giam}%</p> </div>
                            </>

                        )}

                    </div>

                    <div onClick={() => { movepageproductdetail(props.data.ten, props.data); }} className={`${styles['item-content']}  `}>
                        <div className={`${styles['item-img']}`} style={{}}>
                            {props.ishottrending && (
                                <img className={`${styles['img-sticker']}`} src={imghotrenđing} />
                            )}
                            {props.data.phan_tram_giam != 0 && (
                                <div className={`${styles['img-sticker-sale']}`}>
                                    <img src={imgsale} />
                                </div>

                            )}
                            <img src={props.img} className={`${styles['img-product']}`} />
                        </div>

                        <div className={`${styles['info-product']} `} style={{ padding: "10px" }}>
                            <div class="product-wid-rating" style={{ display: 'flex' }}>
                                {datastar}
                            </div>
                            <div style={{ marginBottom: '15px', height: "2rem" }}>
                                <h6 className={`${styles['item-name']}`} >{props.data.ten}</h6>
                            </div>
                            {props.data.phan_tram_giam == 0 && (
                                <>
                                    <div className={`${styles['item-price']}`}>{props.data.gia.toLocaleString('en-US')} VNĐ</div>
                                </>

                            )}
                            {props.data.phan_tram_giam != 0 && (
                                <>

                                    <div className={`${styles['item-price']}`}> <del style={{}}>{props.data.gia.toLocaleString('en-US')}</del> {props.data.gia_khuyen_mai.toLocaleString('en-US')} VNĐ</div>
                                </>

                            )}

                        </div>


                    </div>
                    {isadmin == false && (
                        <>
                            {props.data.so_luong == 0 && (
                                <><img src={imgsoldout} style={{ width: '100%', height: '5rem' }} /></>
                            )}

                            {props.data.so_luong != 0 && (
                                <>  <button onClick={() => { addcart(props) }} style={{ width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: '#1abc9c' }} className="btn btn-success">Add to cart</button></>
                            )}

                        </>
                    )}
                </div>

            </div>

        </>
    );
}