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
    const [relatedproduct,setRelatedProduct] = useState([]);
    useEffect(()=>{
        if(productdetail != null && supplier != null){
            const getAPI = async()=>{
                const response = await axios.post('http://127.0.0.1:8000/api/productdetail/relatedproduct',{
                    id : productdetail.id,
                    nha_cung_cap_id :supplier

                })
                console.log('check APIIII',response.data.data);
                setRelatedProduct(response.data.data);
            }
            getAPI();
        }
        
    },[supplier, productdetail])
    let itemtopseller = [];
    if(relatedproduct != null) {
        itemtopseller = relatedproduct.map((item, index) => {
            if (index >= 0 && index < 3) {
                return (
                    <>
                        <div class="single-wid-product" style={{borderBottom:'1px solid #ccc'}}>
                            <a  href={`/productdetail/${item.id}`}><img src={img} alt="" class="product-thumb" /></a>
                            <p style={{ height: "4%", textDecoration: 'none' }}><a href={`/productdetail/${item.id}`} style={{ color: 'black' }}>{item.ten}</a></p>
                            <div class="product-wid-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-wid-price">
                                <ins style={{color : 'rgb(26, 188, 156)'}}>{item.gia.toLocaleString('en-us')} VNĐ</ins> <del>$425.00</del>
                            </div>
                        </div>
                    </>
                )
            }
    
        })
    }
     console.log(relatedproduct);
    return (
        <>
            <div className={`${styles['main']}`}>
                {itemtopseller}
            </div>
        </>
    );
}

export default Relatedproducts;