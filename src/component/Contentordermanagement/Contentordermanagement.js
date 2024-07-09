import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import BannerOfPage from "../BannerOfPage/BannerOfPage";
import styles from "./contentordermanagement.module.css"
import Dadat from "./Dadat/dadat";
import Danggiao from "./Danggiao/danggiao";
import Dagiao from "./Dagiao/dagiao";
import Chohuy from "./Chohuy/chohuy";
import Dahuy from "./Dahuy/dahuy";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setbtnctdh, setchitietdonhang, setdonhang } from "../../redux/slice/ordermanagement";
export default function Contentmanagement() {
    const [btndadat, setBtndadat] = useState(true);
    const [btndanggiao, setBtndanggiao] = useState(false);
    const [btndagiao, setBtndagiao] = useState(false);
    const [btnchohuy, setBtnchohuy] = useState(false);
    const [btndahuy, setBtndahuy] = useState(false);
    const users_id = useSelector(state=>state.auth.user.id);
   
    const dispatch = useDispatch();
    const dadat = () => {
        setBtndadat(true)
        setBtndanggiao(false)
        setBtndagiao(false)
        setBtnchohuy(false)
        setBtndahuy(false)
    }
    const danggiao = () => {
        setBtndadat(false)
        setBtndanggiao(true)
        setBtndagiao(false)
        setBtnchohuy(false)
        setBtndahuy(false)
    }
    const dagiao = () => {
        setBtndadat(false)
        setBtndanggiao(false)
        setBtndagiao(true)
        setBtnchohuy(false)
        setBtndahuy(false)
    }
    const chohuy = () => {
        setBtndadat(false)
        setBtndanggiao(false)
        setBtndagiao(false)
        setBtnchohuy(true)
        setBtndahuy(false)
    }
    const dahuy = () => {
        setBtndadat(false)
        setBtndanggiao(false)
        setBtndagiao(false)
        setBtnchohuy(false)
        setBtndahuy(true)
    }
    useEffect(()=>{
        const getAPI = async() =>{
            const respones = await axios.get(`http://127.0.0.1:8000/api/donhang/donhang/${users_id}`);
            dispatch(setdonhang(respones.data.data));
            dispatch(setchitietdonhang(respones.data.datactdh));
        }
        getAPI();
    },[])
    return (
        <>
            <BannerOfPage bigTitle='Quản lý đơn hàng' />
            <div style={{ display: 'flex', borderBottom: "1px solid #ccc" }}>
                <div onClick={() => { dadat();dispatch(setbtnctdh(false)) }} className={`${styles['don-hang']} ${styles['da-dat']} ${btndadat ? styles['da-datclicked'] : ''}`}>Đơn Hàng Đã Đặt</div>
                <div onClick={() => { danggiao();dispatch(setbtnctdh(false)) }} className={`${styles['don-hang']} ${styles['dang-giao']} ${btndanggiao ? styles['dang-giaoclicked'] : ''}`}>Đơn Hàng Đang Giao</div>
                <div onClick={() => { dagiao();dispatch(setbtnctdh(false)) }} className={`${styles['don-hang']} ${styles['da-giao']} ${btndagiao ? styles['da-giaoclicked'] : ''}`}>Đơn Hàng Đã Giao</div>
                <div onClick={() => { chohuy();dispatch(setbtnctdh(false)) }} className={`${styles['don-hang']} ${styles['cho-huy']} ${btnchohuy ? styles['cho-huyclicked'] : ''}`}>Đơn Hàng Chờ Hủy</div>
                <div onClick={() => { dahuy();dispatch(setbtnctdh(false)) }} className={`${styles['don-hang']} ${styles['da-huy']} ${btndahuy ? styles['da-huyclicked'] : ''}`}>Đơn Hàng Đã Hủy</div>
            </div>
            {btndadat && (
                <Dadat/>
            )}
            {btndanggiao && (
                <Danggiao/>
            )}
            {btndagiao && (
                <Dagiao/>
            )}
            {btnchohuy && (
                <Chohuy/>
            )}
            {btndahuy && (
                <Dahuy/>
            )}

        </>
    )
}