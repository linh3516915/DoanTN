import { useEffect, useRef, useState } from "react";
import styles from './ProductDetail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Banner from "../Banner/Banner";
export default function ProductDetail(props) {
    const productSectionRef = useRef(null);
    useEffect(() => {
        if (productSectionRef.current) {
            productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (
        <>
            <section ref={productSectionRef} style={{width : '30%',paddingTop: '15px'}} className="">
                <main className="col-lg-6" style={{width:'100%'}}>
                    <div className="ps-lg-3">
                        <h6 className="title text-dark">
                            {props.data.ten}
                        </h6>
                        <div className="mb-3">
                            <span className="h5" style={{fontSize:'1rem'}}>{props.data.gia} VNĐ</span>
                        </div>
                        <div style={{marginBottom : '20px'}}>
                            màu sắc
                        </div>
                        <div  style={{marginBottom : '20px'}}>
                           dung lượng
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-4 col-6 mb-3">
                                <label className="mb-2 d-block">Quantity:</label>
                                <div className="input-group mb-3" style={{ width: '170px' }}>
                                    <input type="number" />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-warning shadow-0">BUY </button>
                        <button className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i>  ADD CART</button>
                        <button className="btn btn-white text-dark"> <i className="me-1 fa fa-shopping-basket"></i>  LIKE </button>
                    </div>
                </main>
            </section>
        </>
    );
}