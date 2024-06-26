import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';

export default function AddHinhAnh() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Formdata, setFormData] = useState({});
    const [ten_hinh_anh, setTenHinhAnh] = useState('');
    const [chi_tiet_san_pham_id, setChiTietSanPham] = useState('');
    const [isAvatarimage, setIsAvatarImage] = useState('');
    const [dsctsp, setDSCTSP] = useState([]);

    useEffect(() => {
        async function fetchChiTietSanPham() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/ctsp/ctsp-admin`);
                const json = await response.json();
                setDSCTSP(json.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchChiTietSanPham();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic if needed
    };

    const themmoi = async () => {
        const formData = new FormData();
        formData.append('ten_hinh_anh', ten_hinh_anh);
        formData.append('chi_tiet_san_pham_id', chi_tiet_san_pham_id);
        formData.append('isAvatarimage', isAvatarimage);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/hinhanh/themmoi-hinhanh', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Thêm hình ảnh chi tiết sản phẩm thành công');
            navigate('/hinhanh-admin');
        } catch (error) {
            console.error('Error adding image:', error);
        }
    };

    const listctsp = dsctsp.map((item) => (
        <option key={item.id} value={item.id}>{item.ten}</option>
    ));

    return (
        <>
            <HeaderAdmin />
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">THÊM MỚI HÌNH ẢNH CHI TIẾT SẢN PHẨM </h1>
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
                                            <div className="col-md-6">
                                                <label htmlFor="selectChiTietSanPham">Select Chi Tiết Sản Phẩm</label>
                                                <select id="selectChiTietSanPham" className="form-select" value={chi_tiet_san_pham_id} onChange={(e) => setChiTietSanPham(e.target.value)} required>
                                                    <option value="">Chi Tiết Sản Phẩm</option>
                                                    {listctsp}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="fileInput">Select Hình Ảnh</label>
                                                <input type="file" id="fileInput" onChange={(e) => setTenHinhAnh(e.target.files[0])} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="selectIsAvatarImage">Is Avatar Image</label>
                                                <select id="selectIsAvatarImage" className="form-select" value={isAvatarimage} onChange={(e) => setIsAvatarImage(e.target.value)} required>
                                                    <option value="">Is Avatar Image</option>
                                                    <option value="1">Avatar</option>
                                                    <option value="0">Không là Avatar</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-12">
                                                <button type="button" className="btn btn-primary" onClick={themmoi}>Thêm</button>
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
