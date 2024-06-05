import { useDispatch, useSelector } from "react-redux";
import { listshow4hottrend, listtop16hottrend, moveright, moveleft } from "../../redux/slice/productdetail";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./toptrendingproduct.module.css"
import { useInView } from "react-intersection-observer";
export default function TopTrendingProduct() {
    const top16hottrends = useSelector(state => state.productdetail.top16hottrend);
    const show4hottrends = useSelector(state => state.productdetail.show4hottrend);
    const none12hottrend = useSelector(state => state.productdetail.none12hottrend);
    const btnanimation = useSelector(state => state.productdetail.btnanimation);
    const { ref, inView } = useInView();
    const dispatch = useDispatch();
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
                <div key={item.id} className={`${styles['item']} ${btnanimation ? 'animation-from-right' : 'animation-from-left'} `}>{item.ten}</div>
            )
        })
    }

    return (
        <>
            <div className="" style={{paddingBottom: '15px'}}>
                <div className="mb-4 " style={{ textAlign: 'center' }}>
                    <p className="text-uppercase opacity-50 font-italic m-0">made the hard way</p>
                    <h4 className="text-uppercase font-italic m-0">top trending products</h4>
                </div>
                <button className={`${styles['move-left']}`} onClick={() => { dispatch(moveleft()) }}>left </button>
                <button className={`${styles['move-right']}`} onClick={() => { dispatch(moveright()) }}>right </button>
                <div style={{ display: 'flex', justifyContent: 'space-around', overflow: 'hidden' }} className={`${styles['list-item']}`}>
                    {/* <div style={{overflow: 'hidden'}}> */}
                    {show}
                    {/* </div> */}
                </div>
                

            </div>
        </>
    );
}