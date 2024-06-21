import { useSelector } from "react-redux";
import img from "../../assets/ảnh/14ve.jpg";
import { useNavigate } from "react-router-dom";
import styles from './search.module.css'
import LoadingSpinner from "../loading/loadingspinner";
import { useEffect } from "react";
export default function Search() {
    const search = useSelector(state => state.filter.filterproduct);
    //const searchs = useSelector(state => state.productdetail.productdetails);
    const result = useSelector(state => state.filter.result);
    const navigate = useNavigate();
    console.log(search)
    let popupfiltersearch = [];
    if ( search !== null) {
        popupfiltersearch = search.map((item, index) => {
            if (index > 0 && index <= 3) {
                return (
                    <>
                        <div className={`${styles['item']}`} onClick={() => { navigate(`/productdetail/${item.id}`) }} style={{ border: 'solid 1px #ccc', padding: '0.5rem', marginBottom: '3%', cursor: 'pointer' }}>
                            <img src={img} alt="" class="product-thumb" height='60px' />
                            <p style={{ height: "10%", textDecoration: 'none' }}><p  style={{ color: 'black' }}>{item.ten}</p></p>
                            <div class="product-wid-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-wid-price">
                                <ins style={{ color: 'black' }}>$400.00</ins> <del>$425.00</del>
                            </div>
                        </div>
                    </>
                )
            }
    
        })
    }
    else{
        return null;
    }
    
    return (
        <>

                <div style={{ width: '100%', backgroundColor: 'white', position: 'absolute' }}>
                    {popupfiltersearch}
                </div>

        </>
    );
}