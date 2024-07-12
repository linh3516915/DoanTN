import { useInView } from 'react-intersection-observer';
import styles from './OtherInfo.module.css'
import { useEffect, useState } from 'react';
import img from "../../assets/ảnh/14ve.jpg";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Star from '../Star/star';
import { checkedtopseller, filterpriceProductdetail, loadingComponent, loadingmodal, settrang } from '../../redux/slice/filterSlice';
import { listProductdetail } from '../../redux/slice/productdetail';
import { useNavigate } from 'react-router-dom';

function OtherInfo() {
    const { ref, inView } = useInView();
    const [topseller, setTopseller] = useState([]);
    const [topnew, setTopnew] = useState([]);
    const recentlyviewed = useSelector(state => state.recentlyviewed.items);
    const checkedTopseller = useSelector(state => state.filter.checkedTopseller);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const getAPI = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/productdetail/topseller');
            setTopseller(response.data.data);
            console.log(response.data.data)
        }
        getAPI()

    }, [])
    const itemtopseller = topseller.map((item, index) => {
        if (index >= 0 && index < 3) {
            return (
                <>
                    <div className="single-wid-product">
                        <a href={`/productdetail/?name=${encodeURIComponent(item.data.ten)}`}><img src={item.image} alt="" className="product-thumb" /></a>
                        <p style={{ height: "", textDecoration: 'none',color:'black' }}><a href={`productdetail/${item.id}`} >{item.data.ten}</a></p>
                        {/* <div className="product-wid-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div> */}
                        <Star so_sao={item.data.so_sao} />
                        <div className="product-wid-price">
                            {item.data.phan_tram_giam == 0 && (
                                <>
                                    <ins style={{ color: 'black' }}>{item.data.gia_khuyen_mai.toLocaleString('en-us')} VND</ins>
                                </>

                            )}
                            {item.data.phan_tram_giam != 0 && (
                                <>

                                    <ins style={{ color: 'black' }}>{item.data.gia_khuyen_mai.toLocaleString('en-us')} VND</ins> <del >{item.data.gia.toLocaleString('en-us')} VND</del>
                                </>

                            )}
                        </div>
                    </div>
                </>
            )
        }

    })
    //recently view 
    const listrecentlyviewed = recentlyviewed.map((item, index) => {
        if (index >= 0 && index < 3) {
            return (
                <>
                    <div className="single-wid-product">
                        <a href={`/productdetail/?name=${encodeURIComponent(item.product.ten)}`}><img src={item.img} alt="" className="product-thumb" /></a>
                        <p style={{ height: "", textDecoration: 'none',color:'black' }}><a href={`productdetail/${item.product.id}`} >{item.product.ten}</a></p>
                        <Star so_sao={item.product.so_sao} />
                        <div className="product-wid-price">
                            {item.product.phan_tram_giam == 0 && (
                                <>
                                    <ins style={{ color: 'black' }}>{item.product.gia_khuyen_mai.toLocaleString('en-us')} VND</ins>
                                </>

                            )}
                            {item.product.phan_tram_giam != 0 && (
                                <>

                                    <ins style={{ color: 'black' }}>{item.product.gia_khuyen_mai.toLocaleString('en-us')} VND</ins> <del>{item.product.gia.toLocaleString('en-us')} VND</del>
                                </>

                            )}

                        </div>
                    </div>
                </>
            )
        }

    })
    // top new
    useEffect(() => {
        const getAPI = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/productdetail/latesproduct');
            setTopnew(response.data.data);
        }
        getAPI()

    }, [])
    const itemtopnew = topnew.map((item, index) => {
        if (index >= 0 && index < 3) {
            return (
                <>
                    <div className="single-wid-product">
                        <a href={`/productdetail/?name=${encodeURIComponent(item.data.ten)}`}><img src={item.image} alt="" className="product-thumb" /></a>
                        <p style={{ height: "", textDecoration: 'none',color:'black' }}><a href={`productdetail/${item.id}`} >{item.data.ten}</a></p>
                        <Star so_sao={item.data.so_sao} />
                        <div className="product-wid-price">
                        {item.data.phan_tram_giam == 0 && (
                                <>
                                    <ins style={{ color: 'black' }}>{item.data.gia_khuyen_mai.toLocaleString('en-us')} VND</ins>
                                </>

                            )}
                            {item.data.phan_tram_giam != 0 && (
                                <>

                                    <ins style={{ color: 'black' }}>{item.data.gia_khuyen_mai.toLocaleString('en-us')} VND</ins> <del>{item.data.gia.toLocaleString('en-us')} VND</del>
                                </>

                            )}
                        </div>
                    </div>
                </>
            )
        }

    })
    return (
        <>
            {/*  */}
            <div style={{paddingBottom:'50px'}} ref={ref} class="maincontent-area">
                {/* <div class="zigzag-bottom"></div> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" style={{}}>
                            <div className="single-product-widget">
                                <h2 style={{color:'black'}} className="product-wid-title">Top Seller</h2>
                                {/* <a href="/shop?ext=topseller" className="wid-view-more"></a> */}
                                <button style={{ border: '0px' }} className="wid-view-more" onClick={() => {
                                    const getAPI = async () => {
                                        dispatch(loadingmodal(true));
                                        const response = await axios.get('http://127.0.0.1:8000/api/productdetail/topseller');
                                        dispatch(settrang(1));
                                        dispatch(listProductdetail(response));
                                        dispatch(filterpriceProductdetail(response.data.result));
                                    }
                                    getAPI();

                                    dispatch(checkedtopseller(true));
                                    navigate(`/shop?ext=${encodeURIComponent('topseller')}`);
                                    dispatch(loadingmodal(false));

                                }}>View All</button>
                                {itemtopseller}
                            </div>
                        </div>
                        <div className="col-md-4" style={{}}>
                            <div className="single-product-widget">
                                <h2 style={{color:'black'}}  className="product-wid-title">Đã Xem</h2>
                                <button style={{ border: '0px' }} className="wid-view-more" onClick={() => {


                                }}>View All</button>
                                {listrecentlyviewed}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="single-product-widget">
                                <h2 style={{color:'black'}}  className="product-wid-title">Top New</h2>
                                <button style={{ border: '0px' }} className="wid-view-more" onClick={() => {


                                }}>View All</button>
                                {itemtopnew}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}

export default OtherInfo;