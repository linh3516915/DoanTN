import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductdetail, sliceproductdetail } from "../../redux/slice/productdetail";
import axios from "axios";
import style from "./producthomepage.module.css"
import CardProductDetail from "../CardProductdetail/cardproductdetail";
import { useNavigate } from "react-router-dom";

export default function ProductHomePage() {
    const [slicectsp, setSlicectsp] = useState({});
    const test = useSelector(state => state.productdetail.sliceproductdetail);
    const listproductdetail = useSelector(state => state.productdetail.productdetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const getAPI = async () => {
            try {

                const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
                );
                dispatch(listProductdetail(data));

            } catch (error) {
                console.error('Error fetching API:', error);
            }
        }
        getAPI();
    }, [dispatch])
    let producthomepage = null;
    if (listproductdetail !== null) {
        producthomepage = listproductdetail.map((item, index) => {
            if (index > 0 && index <= 8) {
                return (
                    <CardProductDetail data={item} />
                );
            }
        })
    }
    const movePage = () => {
        navigate('/shop');
    }
    return (
        <>

            <div class="maincontent-area">
                <div class="zigzag-bottom"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="latest-product">
                                <h2 class="section-title">Latest Product</h2>
                                <div className={`${style['product-list']}`}>
                                    {producthomepage}
                                   
                                </div>
                                <div style={{width:'max-content',margin:'0 auto'}}>
                                <button onClick={() => { movePage() }} className="btn btn-primary" >Xem Thêm sản phẩm </button>
                                </div>
                               
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}