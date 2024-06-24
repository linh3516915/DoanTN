
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
import { useParams } from 'react-router-dom';
export default function UpdateNhaCungCap(){
    const {id}=useParams();
    const navigate = useNavigate();
    const [tenncc, setTenNCC] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/nhacungcap/capnhat-nhacungcap/${id}`, {
                tenncc
            });
       
           
                alert('Cập nhật nhà cung cấp thành công')
                navigate(`/chitietsanpham-admin/${id}`);
            console.log("check them moi", response.data);

        } catch (error) {
        }
    };
    return (
        <>
            {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin />
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">CẬP NHẬT NHÀ CUNG CẤP </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="row g-3" >
                            <div className="col-12">
                                <div className="add_sp-ctsp">
                                    <div className="add_sp">
                                        <div className="row">
                                            <div class="col-md-12">
                                                <label for="Ten" className="form-label ">Tên nhà cung cấp</label>
                                                <input type="text" value={tenncc} onChange={(e) => { setTenNCC(e.target.value) }} required />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary">Lưu</button>
                                            </div>
                                        </div>
                                    </div>

                                </div></div></form>
                    </main>
                </div>
            </div>
        </>
    )
}