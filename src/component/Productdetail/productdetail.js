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
    useEffect(() => {
        // Fetch product detail if it's not available
        if (productdetail == null) {
            const getAPI = async () => {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/productdetail/productdetail', {
                        id: props.id // Assuming props.id is used to fetch product detail
                    });
                    dispatch(getproductdetail(response.data.data));
                    dispatch(addRecently(response.data.data))
                    console.log('API Response:', response.data.data);
                } catch (error) {
                    console.error('Error fetching product detail:', error);
                    // Handle error as needed
                }
            };
            getAPI();
        }
    }, [dispatch, props.id]);

    console.log('check productdetail: ', productdetail);


    // useEffect(() => {
    //     const getAPI = async () => {
    //         const response = await axios.post('http://127.0.0.1:8000/api/productdetail/listmausac', {
    //             san_pham_id: productdetail.san_pham_id
    //         })
    //         dispatch(getcolor())
    //     }
    //     getAPI();
    // }, [dispatch,productdetail.san_pham_id])


    useEffect(() => {
        if (productdetail && !color) { // Only fetch color if not already fetched
            const getAPI = async () => {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/productdetail/listmausac', {
                        san_pham_id: productdetail.san_pham_id
                    });
                    dispatch(getcolor(response.data.data));
                    console.log('Color API Response:', response.data.data);
                } catch (error) {
                    console.error('Error fetching listmausac:', error);
                    // Handle error if needed
                }
            };
            getAPI();
        }
    }, [dispatch, productdetail, color]);
    useEffect(() => {
        if (productdetail && !dungluong) { // Only fetch color if not already fetched
            const getAPI = async () => {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/productdetail/listdungluong', {
                        san_pham_id: productdetail.san_pham_id
                    });
                    dispatch(getdungluong(response.data.data));
                    console.log('Color API Response:', response.data.data);
                } catch (error) {
                    console.error('Error fetching listmausac:', error);
                    // Handle error if needed
                }
            };
            getAPI();
        }
    }, [dispatch, productdetail, dungluong]);
    if (!productdetail) {
        return (
            <>
                <LoadingSpinner />
            </>
        ); // Render null or loading indicator while productdetail is null or being fetched
    }

    if (!color) {
        return (
            <>
                <LoadingSpinner />
            </>
        );
    }
    if (!dungluong) {
        return (
            <>
                <LoadingSpinner />
            </>
        );

    }
    const movepagecolor = (mau_sac_id) => {
        const getAPI = async () => {
            const response = await axios.post('http://127.0.0.1:8000/api/productdetail/findproductdetail', {
                mau_sac_id: mau_sac_id,
                dung_luong_id: productdetail.dung_luong_id
            })
            navigate(`/productdetail/${response.data.data.id}`);
            window.location.reload();
        }
        getAPI();

    }
    const movepagedungluong = (dung_luong_id) => {
        const getAPI = async () => {
            const response = await axios.post('http://127.0.0.1:8000/api/productdetail/findproductdetail', {
                mau_sac_id: productdetail.mau_sac_id,
                dung_luong_id: dung_luong_id
            })
            navigate(`/productdetail/${response.data.data.id}`);
            window.location.reload();
        }
        getAPI();

    }
    const listmausac = color.map((item) => {
        if (item.id == productdetail.mau_sac_id) {
            return (
                <>
                    <button onClick={() => { movepagecolor(item.id) }} className="btn btn-secondary" style={{backgroundColor : 'rgb(26, 188, 156)',marginBottom:'1rem', marginRight: '1rem', fontSize: '1rem' }}>{item.ten_mau_sac}</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button onClick={() => { movepagecolor(item.id) }} className={`btn btn-outline-secondary ${styles['btn-color-dungluong']}`}  style={{marginBottom:'1rem', marginRight: '1rem' }}>{item.ten_mau_sac}</button>
                </>
            )
        }
    })
    const listdungluong = dungluong.map((item) => {
        if (item.id == productdetail.dung_luong_id) {
            return (
                <>
                    <button onClick={() => { movepagedungluong(item.id) }} className={`btn btn-secondary`} style={{backgroundColor : 'rgb(26, 188, 156)', marginRight: '1rem' }}>{item.kich_thuoc}</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button onClick={() => { movepagedungluong(item.id) }}  className={`btn btn-outline-secondary ${styles['btn-color-dungluong']}`} style={{ marginRight: '1rem' }}>{item.kich_thuoc}</button>
                </>
            )
        }

    })

    console.log('check: ', productdetail);
    console.log('check: ', props.id);
    return (
        <>
            <section ref={productSectionRef} style={{ width: '30%', paddingTop: '15px' }} className="">
                <main className="col-lg-6" style={{ width: '100%' }}>
                    <div className="ps-lg-3">
                        < h6 className="title text-dark"> {productdetail.ten}</h6>
                        <div className="mb-3">
                            <span className="h5" style={{ fontSize: '1rem', color: '#1abc9c', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>{productdetail.gia.toLocaleString('en-us')} VNĐ</span>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',marginBottom:'0.5rem' }}>
                            <button className="btn btn-primary text-white" style={{ width: '49%' }}> <FontAwesomeIcon icon={faThumbsUp} />  LIKE </button>

                            <button className="btn btn-success shadow-0" style={{ width: '49%' }}> <FontAwesomeIcon icon={faCartPlus} />  ADD CART</button>

                        </div>
                        <div style={{ width: '100%' }}>
                            <button className="btn btn-warning shadow-0" style={{ width: '100%', margin: '0 auto' }}><FontAwesomeIcon icon={faBagShopping} /> BUY </button>
                        </div>

                    </div>
                </main>
            </section>
        </>
    );
}