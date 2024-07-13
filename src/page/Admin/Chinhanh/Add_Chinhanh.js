import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
import Address from '../../../component/Address/address';
import { useDispatch, useSelector } from "react-redux";
import { match } from '../../../redux/slice/addressSlice';
import { apiUrl } from '../../../api/api';
export default function AddChiNhanh() {
    const navigate = useNavigate();
    const [tenchinhanh, setTenChiNhanh] = useState('');
    const address = useSelector(state => state.address.Address);
    const [sdttongdai, setSDT] = useState('');
    const [giomocua, setGioMoCua] = useState('');
    const [ngaykhaitruong, setNgayKhaiTruong] = useState('');
    
    const pro = useSelector(state => state.address.province);
    const dic = useSelector(state => state.address.district);
    const wa = useSelector(state => state.address.ward);
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(match());
        console.log("Address being sent:", address,pro,dic,wa);  // Kiểm tra giá trị của address
        try {
            const response = await axios.post(`${apiUrl}/diachi/themmoi-chinhanh`, {
                tenchinhanh,
                address,
                sdttongdai,
                giomocua,
                ngaykhaitruong
            });

            alert('Thêm chi nhánh thành công')
            navigate('/chinhanh-admin');

            console.log("check them moi", response.data);

        } catch (error) {
        }
    }
    

    return (
        <>
            <HeaderAdmin />
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin />
                    <main style={{ width: '84%', height: '38rem', overflow: 'scroll' }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">THÊM MỚI CHI NHÁNH </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                </div>
                            </div>
                        </div>
                        <form style={{ margin: '0', maxWidth: '100%' }} onSubmit={handleSubmit}  >
                            {/* <div className="col-12">
                                <div className="add_sp-ctsp">
                                    <div className="add_sp">
                                        <div className="row">
                                            <div class="col-md-12">
                                                <label style={{fontSize:'25px'}} for="Ten" className="form-label ">Tên chi nhánh</label>
                                                <input type="text" value={tenchinhanh} onChange={(e) => { setTenChiNhanh(e.target.value) }} required />
                                            </div>
                                            <div style={{ paddingTop: '30px', paddingBottom: '20px' }}>< label style={{fontSize:'25px',paddingBottom:'10px'}} for="Ten" className="form-label ">Địa chỉ</label>
                                                <div >  <Address /></div>
                                            </div>
                                            <div className="row">
                                                <div class="col-md-12">
                                                    <label style={{fontSize:'25px'}} for="Ten" className="form-label ">Liên hệ</label>
                                                    <input type="text" value={sdttongdai} onChange={(e) => { setSDT(e.target.value) }} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div class="col-md-12">
                                                <label for="Ten" className="form-label ">Giờ mở cửa</label>
                                                <input type="text" value={giomocua} onChange={(e) => { setGioMoCua(e.target.value) }} required />
                                            </div>
                                            <div class="col-md-12">
                                                <label for="Ten" className="form-label ">Ngày khai trương</label>
                                                <input type="text" value={ngaykhaitruong} onChange={(e) => { setNgayKhaiTruong(e.target.value) }} required />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary">Thêm</button>
                                            </div>
                                        </div>
                                    </div>

                                </div></div> */}
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label style={{ fontSize: '25px' }} for="Ten" className="form-label ">Tên chi nhánh</label>
                                        <input type="text" value={tenchinhanh} onChange={(e) => { setTenChiNhanh(e.target.value) }} required />
                                    </div>
                                    <div style={{ marginLeft: '150px' }} class="col-md-6">
                                        < label style={{ fontSize: '25px', paddingBottom: '20px' }} for="Ten" className="form-label ">Địa chỉ</label>
                                        <Address />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label style={{ fontSize: '25px' }} for="Ten" className="form-label ">Liên hệ</label>
                                        <input type="text" value={sdttongdai} onChange={(e) => { setSDT(e.target.value) }} required />
                                    </div>
                                    <div class="col-md-4">
                                        <label style={{ fontSize: '25px' }} for="Ten" className="form-label ">Giờ mở cửa</label>
                                        <input type="text" value={giomocua} onChange={(e) => { setGioMoCua(e.target.value) }} required />
                                    </div>
                                    <div class="col-md-4">
                                        <label style={{ fontSize: '25px' }} for="Ten" className="form-label ">Ngày khai trương</label>
                                        <input type="text" value={ngaykhaitruong} onChange={(e) => { setNgayKhaiTruong(e.target.value) }} required />
                                    </div>
                                </div>
                                <div className="row pt-3">
                                    <div className="col-md-12">
                                        <button type="submit" onClick={()=>{dispatch(match())}} className="btn btn-primary">Thêm</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>

    )

}