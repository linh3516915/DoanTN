import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';

export default function UpdateSlideshow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ten_anh, setTenAnh] = useState('');
    const [URL_anh, setURLAnh] = useState('');
    const [noi_dung, setNoiDung] = useState('');
   



    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic if needed
    };

    const themmoi = async () => {
        const formData = new FormData();
        formData.append('ten_anh', ten_anh);
        formData.append('URL_anh', URL_anh);
        formData.append('noi_dung', noi_dung);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/slideshow/capnhat-slideshow/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(' Cập nhật Slideshow thành công');
            navigate('/slideshow-admin');
        } catch (error) {
            console.error('Lỗi thêm slideshow:', error);
        }
    };

    return (
        <>
            <HeaderAdmin />
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin />
                    <main style={{width:'80%',height: '45rem' , overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2"> CẬP NHẬT SLIDESHOW  </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-12">
                                <div className="add_sp-ctsp">
                                    <div className="add_sp">
                                        <div className="row">
                                        
                                            <div class="col-md-12">
                                                <label for="Ten" className="form-label ">Tên ảnh</label>
                                                <input type="text" value={ten_anh} onChange={(e) => { setTenAnh(e.target.value) }} required />
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <label htmlFor="fileInput">Select Hình Ảnh</label>
                                                <input type="file" id="fileInput" onChange={(e) => setURLAnh(e.target.files[0])} required />
                                            </div>
                                            
                                            
                                            <div class="col-md-12">
                                                <label for="Ten" className="form-label ">Nội dung</label>
                                                <input type="text" value={noi_dung} onChange={(e) => { setNoiDung(e.target.value) }} required />
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-12">
                                                <button type="button" className="btn btn-primary" onClick={themmoi}>Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}
