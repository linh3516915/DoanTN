import { useDispatch, useSelector } from "react-redux";
import { listtop16hottrend } from "../../redux/slice/productdetail";
import axios from "axios";
import { useEffect } from "react";
export default function TopTrendingProduct() {
    const top16hottrends = useSelector(state=>state.productdetail.top16hottrend);
    console.log('top16hottrend',top16hottrends);
    
    return (
        <>
            <div className="">
                <div className="mb-4 " style={{textAlign : 'center'}}>
                    <p className="text-uppercase opacity-50 font-italic m-0">made the hard way</p>
                    <h4 className="text-uppercase font-italic m-0">top trending products</h4>
                </div>
                <div >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
}