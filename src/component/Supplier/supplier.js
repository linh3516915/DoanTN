import { useDispatch, useSelector } from "react-redux";
import { listshow4hottrend, listtop16hottrend, moveright, moveleft } from "../../redux/slice/productdetail";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./supplier.module.css"
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function Supplier() {
    const top16hottrends = useSelector(state => state.productdetail.top16hottrend);
    const show4hottrends = useSelector(state => state.productdetail.show4hottrend);
    const none12hottrend = useSelector(state => state.productdetail.none12hottrend);
    const btnanimation = useSelector(state => state.productdetail.btnanimation);
    const { ref, inView } = useInView();
    const dispatch = useDispatch();
    const navigate= useNavigate();
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
                <div onClick={()=>{
                        navigate('/productdetail');
                }} key={item.id} className={`${styles['item']} ${btnanimation ? 'animation-from-right' : 'animation-from-left'} `}>{item.ten}</div>
    
            )
        })
    }

    return (
        <>
            <div className={`${styles['top-trending']}`} style={{ paddingBottom: '15px' }}>
                <div className="mb-5 " style={{ textAlign: 'center' }}>
                    <p className="text-uppercase opacity-50 font-italic m-0">made the hard way</p>
                    <h4 className="text-uppercase font-italic m-0">top trending products</h4>
                </div>


                <div style={{ display: 'flex', justifyContent: 'space-around', overflow: 'hidden' }} className={`${styles['list-item']}`}>
                    <button className={`btn ${styles['move-left']}`} onClick={() => { dispatch(moveleft()) }}><p style={{ opacity: 0.25 }}><FontAwesomeIcon icon={faAngleLeft} /></p> </button>
                    {/* <div style={{overflow: 'hidden'}}> */}
                    {show}
                    {/* </div> */}

                    <button className={`btn  ${styles['move-right']}`} onClick={() => { dispatch(moveright()) }}><p style={{ opacity: 0.25 }}><FontAwesomeIcon icon={faAngleRight} /></p> </button>
                </div>


            </div>
        </>
    );
}