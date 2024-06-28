import { useLocation, useParams } from "react-router-dom";
import ProductDetail from "../../../component/Productdetail/productdetail";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";
import ImageProductDetail from "../../../component/Productdetail/Imageproductdetail/imageproductdetail";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import InfoProductDetail from "../../../component/Productdetail/Infoproductdetail/infoproductdetail";
import InfoTechnical from "../../../component/Productdetail/Technicalinformation/infotechnical";
import { useDispatch, useSelector } from "react-redux";
import { getcolor, getdungluong, getproductdetail } from "../../../redux/slice/itemproductdetail";
import { addRecently } from "../../../redux/slice/recentlyviewedSlice";
import Commentandvote from "../../../component/Productdetail/Commentandvote/commentandvote";
import Relatedproducts from "../../../component/Productdetail/Relatedproducts/relatedproducts";


export default function ProductDetailPage() {
    const productdetailpageSectionRef = useRef(null);
    const productdetail = useSelector(state => state.itemproductdetail.productdetail);
    useEffect(() => {
        if (productdetailpageSectionRef.current) {
            productdetailpageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    const dispatch= useDispatch()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nameproduct = searchParams.get('name');
    console.log('check ame',nameproduct);
    useEffect(() => {
        // Fetch product detail if it's not available
        if (productdetail == null) {
            const getAPI = async () => {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/productdetail/productdetail', {
                        ten: nameproduct // Assuming props.id is used to fetch product detail
                    });
                    dispatch(getproductdetail(response.data));
                    dispatch(getcolor(response.data.mau_sac));
                    dispatch(getdungluong(response.data.dung_luong));
                    dispatch(addRecently(response.data.data));
                    console.log('API Response:', response.data.data);
                } catch (error) {
                    console.error('Error fetching product detail:', error);
                    // Handle error as needed
                }
            };
            getAPI();

        }

    }, [dispatch,nameproduct]);
    return (
        <>
            <Header />
            <div ref={productdetailpageSectionRef} className="container d-flex flex-column gap-4" style={{ marginBottom: '30px' }}>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <ImageProductDetail />
                    <ProductDetail  />
                </div>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <InfoProductDetail />
                    <InfoTechnical/>
                </div>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <Commentandvote/>
                    <Relatedproducts/>
                </div>

            </div>
            <Footer />
        </>
    );
}