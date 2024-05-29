import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductdetail,sliceproductdetail } from "../../redux/slice/productdetail";
import axios from "axios";

export default function ProductHomePage() {
    const [slicectsp, setSlicectsp] = useState({});
    const test = useSelector(state=>state.productdetail.sliceproductdetail);
    const dispatch = useDispatch();
    const listproductdetail = useSelector(state => state.productdetail.productdetail);
    useEffect(() => {
        try {
            const getAPI = async () => {
                const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
                );
                console.log('check data: ', data);
                dispatch(listProductdetail(data));
            }
            getAPI();
        } catch (error) {

        }
    }, [dispatch])
console.log('test',listproductdetail);


    return (
        <>
            <div style={{ position: 'relative' }}>
                <div className="mb-4" style={{ textAlign: 'center' }}>
                    <p className="text-uppercase opacity-50 font-italic m-0">made the hard way</p>
                </div>
                <div>Sản Phẩm tại đây tầm khoảng 10 sản phẩm</div>
                <button className="btn btn-primary" >Xem Thêm sản phẩm </button>
            </div>
        </>
    );
}