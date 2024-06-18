import { useParams } from "react-router-dom";
import ProductDetail from "../../../component/Productdetail/productdetail";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";
import ImageProductDetail from "../../../component/Productdetail/imageproductdetail";
import { useEffect, useState } from "react";
import axios from "axios";




export default function ProductDetailPage() {
    const [productdetail, setProductDetail] = useState();
    let { id } = useParams();
    useEffect(() => {
        const getAPI = async () => {
            const response = await axios.post('http://127.0.0.1:8000/api/productdetail/productdetail',
                {id}
                );
            setProductDetail(response.data.data);
        }
        getAPI();
    }, [])
    return (
        <>
            <Header />
            <div className="container d-flex flex-column gap-4" style={{marginBottom : '30px'}}>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <ImageProductDetail />
                    <ProductDetail data={productdetail}/>
                </div>
            </div>
            <Footer />
        </>
    );
}