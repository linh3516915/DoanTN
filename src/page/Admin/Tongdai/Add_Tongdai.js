
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';

export default function AddTongDai() {
    const navigate = useNavigate();
    const [tenso, setTenSo] = useState('');
    const [sodienthoai, setSoDienThoai] = useState('');
    const [giobatdau, setGioBatDau] = useState('');
    const [gioketthuc, setGioKetThuc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/tongdai/themmoi-tongdai', {
                tenso,
                sodienthoai,
                giobatdau,
                gioketthuc
            });
            if (response.data.success == -1) {
                alert(response.data.message);
            }
            else if (response.data.success == 0) {
                alert(response.data.message);
            }
            else {
                alert('Thêm tổng đài thành công')
                navigate('/tongdai-admin');
            }


        } catch (error) {
        }
    };
    return (
        <>
            {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin />
            <div className="container-fluid">
                <div style={{height: '38rem'}} className="row">
                    <TaskbarAdmin />
                    <main style={{ width: '84%', overflow: 'scroll' }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">THÊM MỚI TỔNG ĐÀI </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '60%' }}>
                            <form onSubmit={handleSubmit} className="row g-3" style={{ width: '50%' }}>
                                <div className="col-12">
                                    <div className="add_sp-ctsp">
                                        <div className="add_sp">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="Ten" className="form-label">Tên số</label>
                                                    <input type="text" value={tenso} onChange={(e) => { setTenSo(e.target.value) }} required className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="Ten" className="form-label">Số điện thoại</label>
                                                    <input type="text" value={sodienthoai} onChange={(e) => { setSoDienThoai(e.target.value) }} required className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6 ">
                                                    <label htmlFor="Ten" className="form-label">Giờ hoạt động</label>
                                                    <input type="text" value={giobatdau} onChange={(e) => { setGioBatDau(e.target.value) }} required className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="Ten" className="form-label">Giờ kết thúc</label>
                                                    <input type="text" value={gioketthuc} onChange={(e) => { setGioKetThuc(e.target.value) }} required className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row pt-3">
                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}