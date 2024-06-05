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
                console.log('check data: ', data);
                dispatch(listProductdetail(data));

            } catch (error) {
                console.error('Error fetching API:', error);
            }
        }
        getAPI();
     }, [dispatch])
    console.log('testss', listproductdetail);
     let producthomepage = null;
     if(listproductdetail !== null)
        {
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
     console.log("sản pham : ", producthomepage);
    return (
        <>
            <div style={{ position: 'relative' }}>
                <div className="mb-4" style={{ textAlign: 'center' }}>
                    <p className="text-uppercase opacity-50 font-italic m-0">made the hard way</p>
                    <h4 className="text-uppercase font-italic m-0">new products</h4>
                </div>
                <div className={`${style['product-list']}`}>
                    {producthomepage}
                    <button onClick={() => { movePage() }} className="btn btn-primary" >Xem Thêm sản phẩm </button>
                </div>

            </div>
        </>
    );
}