import { useInView } from 'react-intersection-observer';
import styles from './OtherInfo.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function OtherInfo() {
    const { ref, inView } = useInView();
    const [topseller, setTopseller] = useState([]);
    const [topnew,setTopnew] = useState([]);
    useEffect(() => {
        const getAPI = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/productdetail/topseller');
            setTopseller(response.data.data);
        }
        getAPI()

    }, [])
    const itemtopseller = topseller.map((item, index) => {
        if (index >= 0 && index < 3) {
            return (
                <>
                    <div class="single-wid-product">
                        <a href="single-product.html"><img src="img/product-thumb-1.jpg" alt="" class="product-thumb" /></a>
                        <p style={{height : "4rem" , textDecoration:'none'}}><a href="single-product.html" style={{color: '#f5f5f5'}}>{item.chi_tiet_san_pham.ten}</a></p>
                        <div class="product-wid-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product-wid-price">
                            <ins>$400.00</ins> <del>$425.00</del>
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
                    <div class="single-wid-product">
                        <a href="single-product.html"><img src="img/product-thumb-1.jpg" alt="" class="product-thumb" /></a>
                        <p style={{height : "4rem" , textDecoration:'none'}}><a href="single-product.html" style={{color: '#f5f5f5'}}>{item.ten}</a></p>
                        <div class="product-wid-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <div class="product-wid-price">
                            <ins>$400.00</ins> <del>$425.00</del>
                        </div>
                    </div>
                </>
            )
        }

    })
    return (
        <>
            {/*  */}
            <div ref={ref} class="product-widget-area">
                <div class="zigzag-bottom"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="single-product-widget">
                                <h2 class="product-wid-title">Top Seller</h2>
                                <a href="" class="wid-view-more">View All</a>
                                {itemtopseller}
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="single-product-widget">
                                <h2 class="product-wid-title">Đã Xem</h2>
                                <a href="#" class="wid-view-more">View All</a>
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="single-product-widget">
                                <h2 class="product-wid-title">Top New</h2>
                                <a href="#" class="wid-view-more">View All</a>
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