import { useEffect, useRef, useState } from "react";
import styles from './ProductDetail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faCartPlus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Banner from "../Banner/Banner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getcolor, getproductdetail, getdungluong } from "../../redux/slice/itemproductdetail";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../loading/loadingspinner";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons/faBagShopping";
import { addRecently } from "../../redux/slice/recentlyviewedSlice";
import Star from "../Star/star";
import { addCart } from "../../redux/slice/cartSlice";
import { setsuccess } from "../../redux/slice/popupSlice";
import { apiUrl } from "../../api/api";
export default function ProductDetail(props) {
    const [mausac, setMauSac] = useState([]);
    const productSectionRef = useRef(null);
    const productdetail = useSelector(state => state.itemproductdetail.productdetail);
    const color = useSelector(state => state.itemproductdetail.color);
    const dungluong = useSelector(state => state.itemproductdetail.dungluong);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (productSectionRef.current) {
            productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    if (!productdetail || !color || !dungluong) {
        return (
            <>
                <LoadingSpinner />
            </>
        ); 
    }
    const addcart= (item) =>{
        console.log(item);
        dispatch(addCart(item))
        dispatch(setsuccess(true));

    }
    
    const movepagecolor = (mau_sac_id) => {
        const getAPI = async () => {
            const response = await axios.post(`${apiUrl}/productdetail/findproductdetail`, {
                mau_sac_id: mau_sac_id,
                dung_luong_id: productdetail.data.dung_luong_id,
                san_pham_id: productdetail.data.san_pham_id,
            })
            navigate(`/productdetail/?name=${encodeURIComponent(response.data.data[0].data.ten)}`);
            //window.location.reload();
        }
        getAPI();

    }
    const movepagedungluong = (dung_luong_id) => {
        // console.log('check 3 cái :',productdetail.mau_sac_id,dung_luong_id,productdetail.san_pham_id);
        const getAPI = async () => {
            const response = await axios.post(`${apiUrl}/productdetail/findproductdetail`, {
                mau_sac_id: productdetail.data.mau_sac_id,
                dung_luong_id: dung_luong_id,
                san_pham_id: productdetail.data.san_pham_id,
            })
            console.log('ten nè ',response.data.data[0].data.ten )
            navigate(`/productdetail/?name=${encodeURIComponent(response.data.data[0].data.ten)}`);
            //window.location.reload();
        }
        getAPI();

    }
    const listmausac = color.map((item) => {
        if (item.id === productdetail.data.mau_sac_id) {
            return (
                <>
                    <button onClick={() => { movepagecolor(item.id) }} className="btn btn-secondary" style={{ backgroundColor: 'rgb(26, 188, 156)', marginBottom: '1rem', marginRight: '1rem', fontSize: '1rem' }}>{item.ten_mau_sac}</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button onClick={() => { movepagecolor(item.id) }} className={`btn btn-outline-secondary ${styles['btn-color-dungluong']}`} style={{ marginBottom: '1rem', marginRight: '1rem' }}>{item.ten_mau_sac}</button>
                </>
            )
        }
    })
    const listdungluong = dungluong.map((item) => {
        if (item.id == productdetail.data.dung_luong_id) {
            return (
                <>
                    <button onClick={() => { movepagedungluong(item.id) }} className={`btn btn-secondary`} style={{ backgroundColor: 'rgb(26, 188, 156)', marginRight: '1rem' }}>{item.kich_thuoc}</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button onClick={() => { movepagedungluong(item.id) }} className={`btn btn-outline-secondary ${styles['btn-color-dungluong']}`} style={{ marginRight: '1rem' }}>{item.kich_thuoc}</button>
                </>
            )
        }

    })
    return (
        <>
            <section ref={productSectionRef} style={{ width: '30%', paddingTop: '15px' }} className="">
                <main className="col-lg-6" style={{ width: '100%' }}>
                    <div className="ps-lg-3">
                        < h6 className="title text-dark"> {productdetail.data.ten}</h6>
                        <div className="mb-3">
                            <Star so_sao={productdetail.data.so_sao} />
                            {productdetail.data.phan_tram_giam != 0 &&(
                                <>
                                 <span className="h5" style={{ fontSize: '1rem', color: '#1abc9c', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>{productdetail.data.gia_khuyen_mai.toLocaleString('en-us')} VNĐ</span> <del>{productdetail.data.gia.toLocaleString('en-us')} VNĐ</del>
                                </>
                            )}
                            {productdetail.data.phan_tram_giam == 0 &&(
                                <>
                                 <span className="h5" style={{ fontSize: '1rem', color: '#1abc9c', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>{productdetail.data.gia.toLocaleString('en-us')} VNĐ</span>
                                </>
                            )}
                            {/* <span className="h5" style={{ fontSize: '1rem', color: '#1abc9c', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>{productdetail.gia.toLocaleString('en-us')} VNĐ</span> <del></del> */}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            {listmausac}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            {listdungluong}
                        </div>
                        {/* <div className="row mb-4">
                            <div className="col-md-4 col-6 mb-3">
                                <label className="mb-2 d-block">Quantity:</label>
                                <div className="input-group mb-3" >
                                    <form action="">
                                        <div class="quantity">
                                            <input type="number" size="4" class="input-text qty text" title="Qty" value="1" name="quantity" min="1" step="1" />
                                        </div>
                                    </form>

                                    <input style={{ width: '100%' }} type="number" id="quantity" name="quantity" step="1" min="1" max="5" />
                                </div>

                            </div>

                        </div> */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                            <button className="btn btn-primary text-white" style={{ width: '49%' }}> <FontAwesomeIcon icon={faThumbsUp} />  Thích </button>

                            <button onClick={()=>{addcart(productdetail)}} className="btn btn-success shadow-0" style={{ width: '49%' }}> <FontAwesomeIcon icon={faCartPlus} />Thêm Vào Giỏ</button>

                        </div>
                        <div style={{ width: '100%' }}>
                            <button onClick={()=>{addcart(productdetail);navigate('/cart'); }} className="btn btn-danger shadow-0" style={{ width: '100%', margin: '0 auto' }}><FontAwesomeIcon icon={faBagShopping} /> Mua Ngay </button>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}