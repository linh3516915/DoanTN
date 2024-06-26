
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
export default function AddDungLuong() {
    const navigate = useNavigate();
    const [kich_thuoc, setKichThuoc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/dungluong/themmoi-dungluong', {
                kich_thuoc
            });
            if (response.data.success == -1) {
                alert(response.data.message);
            }
            else if (response.data.success == 0) {
                alert(response.data.message);
            }
            else {
                alert('Thêm dung lượng thành công')
                navigate('/dungluong-admin');
            }
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
                            <h1 className="h2">THÊM MỚI DUNG LƯỢNG SẢN PHẨM </h1>
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
                                                <label for="Ten" className="form-label ">Kích thước</label>
                                                <input type="text" value={kich_thuoc} onChange={(e) => { setKichThuoc(e.target.value) }} required />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary">Thêm</button>
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