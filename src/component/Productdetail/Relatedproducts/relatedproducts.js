import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import styles from './relatedproducts.module.css'
import { useSelector } from "react-redux";
import img from "../../../assets/ảnh/14ve.jpg";
import axios from "axios";
function Relatedproducts() {
    const productdetail = useSelector(state=>state.itemproductdetail.productdetail);
    const supplier = useSelector(state=>state.itemproductdetail.supplier);
    // useEffect(()=>{
    //     if(productdetail != null && supplier != null){
    //         const getAPI = async()=>{
    //             const response = await axios.post('http://127.0.0.1:8000/api/productdetail/relatedproduct',{
    //                 nha_cung_cap_id :supplier

    //             })
    //             console.log('check APIIII',response.data.data);
    //             setRelatedProduct(response.data.data);
    //         }
    //         getAPI();
    //     }
        
    // },[supplier, productdetail])
    let itemtopseller = [];
    if(supplier != null) {
        itemtopseller = supplier.map((item, index) => {
            if (index >= 0 && index < 3) {
                return (
                    <>
                        <div  class="single-wid-product" style={{marginBottom:'18px',borderBottom:'1px solid #ccc'}}>
                            <a  href={`/productdetail/?name=${encodeURIComponent(item.data.ten)}`}><img src={item.image} alt="" class="product-thumb" /></a>
                            <p style={{ height: "4%", textDecoration: 'none' }}><a href={`/productdetail/${item.id}`} style={{ color: 'black' }}>{item.data.ten}</a></p>
                            <div class="product-wid-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-wid-price">
                                <ins style={{color : 'rgb(26, 188, 156)'}}>{item.data.gia.toLocaleString('en-us')} VNĐ</ins> 
                                {/* <del>$425.00</del> */}
                            </div>
                        </div>
                    </>
                )
            }
    
        })
    }
    return (
        <>
            <div className={`${styles['main']}`}>
                <p style={{marginBottom:'1.1rem'}}> Sản phẩm liên quan</p>
                {itemtopseller}
            </div>
        </>
    );
}

export default Relatedproducts;