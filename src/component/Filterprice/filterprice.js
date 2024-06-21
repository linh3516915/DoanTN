import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterpriceProductdetail, settrang } from "../../redux/slice/filterSlice";
import { listProductdetail } from "../../redux/slice/productdetail";
import { useNavigate } from "react-router-dom";

export default function FilterPrice() {
    const [giatu, setGiatu] = useState(1000000);
    const [giaden, setGiaden] = useState(50000000);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filterprice = (giatu, giaden) => {
       // if (giatu.trim() && giaden.trim()) { // Kiểm tra xem có từ khóa tìm kiếm không trống
            navigate(`/shop?giatu=${encodeURIComponent(giatu)}&giaden=${encodeURIComponent(giaden)}`); // Điều hướng đến trang shop với tham số q
            setGiatu(1000000);
            setGiaden(50000000);
       // }
    }
    const Handlesubmid = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="bo-loc-gia">
                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" >Name of manufacturer</button>
                    <ul className="dropdown-menu">
                        {/* {listNCC} */}
                    </ul>
                    <button className="btn btn-outline-secondary dropdown-toggle custom-margin" type="button" data-bs-toggle="dropdown" >Filter by price</button>
                    <ul className="dropdown-menu" style={{ padding: '1rem' }}>
                        <h2 style={{ fontFamily: 'initial' }}>Lọc theo giá</h2>
                        <div style={{ padding: '1rem', border: 'solid 1px #ccc' }}>
                            <div className="d-flex  justify-content-between" style={{ borderBottom: 'solid 1px', marginBottom: '1rem' }}>
                                <form onSubmit={Handlesubmid}>
                                    <li><button onClick={() => { filterprice(1000000, 12000000) }} className="btn btn-outline-success">dưới 12,000,000</button></li>
                                    <li style={{ width: "max-content" }}><button onClick={() => { filterprice(12000000, 15000000) }} className="btn btn-outline-success" >12000000 đến 15,000,000</button></li>
                                    <li><button onClick={() => { filterprice(15000000, 50000000) }} className="btn btn-outline-success mb-4" >trên 15,000,000</button></li>
                                </form>
                            </div>
                            <h4 style={{ textAlign: 'center' }}>Nhập giá</h4>
                            <form onSubmit={Handlesubmid}>
                                <div className="d-flex  justify-content-around" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: 'solid 1px' }}>
                                    <li>
                                        <p style={{ marginBottom: '0px' }}>Giá từ</p>
                                        <input type="number" value={giatu} onChange={(e) => { setGiatu(e.target.value) }} style={{ padding: '0.5rem', border: 'solid 1px #ccc', marginTop: '0' }} placeholder="1000000" min="1000000" max="50000000" /></li>
                                    <li>
                                        <p style={{ marginBottom: '0px' }}>Giá đến</p>
                                        <input type="number" value={giaden} onChange={(e) => { setGiaden(e.target.value) }} style={{ padding: '0.5rem', border: 'solid 1px #ccc', marginTop: '0' }} placeholder="50000000" min="1000000" max="50000000" /></li>
                                </div>
                                <div style={{ width: 'max-content', margin: '0 auto' }}>
                                    <button className="btn btn-success " onClick={() => { filterprice(giatu, giaden) }} style={{ width: '6rem' }} >Lọc</button>
                                </div>
                            </form>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}