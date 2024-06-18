import { useDispatch, useSelector } from "react-redux";
import { listshow4hottrend, listtop16hottrend, moveright, moveleft } from "../../redux/slice/productdetail";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./supplier.module.css"
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img from "../../assets/ảnh/14ve.jpg";
import CardProductDetail from "../CardProductdetail/cardproductdetail";
export default function Supplier() {
    const top16hottrends = useSelector(state => state.productdetail.top16hottrend);
    const show4hottrends = useSelector(state => state.productdetail.show4hottrend);
    const none12hottrend = useSelector(state => state.productdetail.none12hottrend);
    const btnanimation = useSelector(state => state.productdetail.btnanimation);
    const { ref, inView } = useInView();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const getAPI = async () => {
                const data = await axios.get('http://127.0.0.1:8000/api/productdetail/top8hottrending',
                );
                console.log('check data: ', data.data);
                dispatch(listtop16hottrend(data.data));
                // dispatch(listshow4hottrend(data.data));
            }
            getAPI();
        } catch (error) {
            alert('loi');
        }
    }, [dispatch])
    console.log('top16hottrends', top16hottrends);
    console.log('show:', show4hottrends);
    let show = null;
    if (show4hottrends !== null) {
        show = show4hottrends.map((item, index) => {
            return (
                <CardProductDetail data={item} animation = {btnanimation}/>

            )
        })
    }

    return (
        <>




            {/*  */}
            <div ref={ref} class="maincontent-area">
                <div class="zigzag-bottom"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="latest-product">
                                <h2 class="section-title">Thương Hiệu Nổi Tiếng</h2>
                                <div  className={`${styles['top-trending']}`} style={{ paddingBottom: '15px' }}>

                                    <div  style={{ marginTop: '35px', display: 'flex', justifyContent: 'space-around', overflow: 'hidden' }} className={`${styles['list-item']} ${inView ? 'animation-from-right': ''}`}>
                                        <button className={`btn ${styles['move-left']}`} onClick={() => { dispatch(moveleft()) }}><p style={{ opacity: 0.25 }}><FontAwesomeIcon icon={faAngleLeft} /></p> </button>
                                        {/* <div style={{overflow: 'hidden'}}> */}
                                        {show}
                                        {/* </div> */}

                                        <button className={`btn  ${styles['move-right']}`} onClick={() => { dispatch(moveright()) }}><p style={{ opacity: 0.25 }}><FontAwesomeIcon icon={faAngleRight} /></p> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}