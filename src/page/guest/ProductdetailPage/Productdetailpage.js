import { useParams } from "react-router-dom";
import ProductDetail from "../../../component/Productdetail/productdetail";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";
import ImageProductDetail from "../../../component/Productdetail/Imageproductdetail/imageproductdetail";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import InfoProductDetail from "../../../component/Productdetail/Infoproductdetail/infoproductdetail";
import InfoTechnical from "../../../component/Productdetail/Technicalinformation/infotechnical";
import { useDispatch, useSelector } from "react-redux";
import { getproductdetail } from "../../../redux/slice/itemproductdetail";
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
    let { id } = useParams();
    
    return (
        <>
            <Header />
            <div ref={productdetailpageSectionRef} className="container d-flex flex-column gap-4" style={{ marginBottom: '30px' }}>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <ImageProductDetail />
                    <ProductDetail id={id} />
                </div>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <InfoProductDetail id={id} />
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