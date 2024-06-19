import { useParams } from "react-router-dom";
import ProductDetail from "../../../component/Productdetail/productdetail";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";
import ImageProductDetail from "../../../component/Productdetail/imageproductdetail";
import { useEffect, useRef, useState } from "react";
import axios from "axios";




export default function ProductDetailPage() {
    const productdetailpageSectionRef = useRef(null);
    useEffect(() => {
        if (productdetailpageSectionRef.current) {
            productdetailpageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    let { id } = useParams();
    
    return (
        <>
            <Header />
            <div ref={productdetailpageSectionRef}  className="container d-flex flex-column gap-4" style={{marginBottom : '30px'}}>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <ImageProductDetail />
                    <ProductDetail id={id}/>
                </div>
            </div>
            <Footer />
        </>
    );
}