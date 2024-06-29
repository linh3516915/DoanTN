
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
import PopupAddLSP from '../../../component/Admin/AddTHvaLSP/AddLoaiSP';
import PopupAddNCC from '../../../component/Admin/AddTHvaLSP/AddNhaCungCap';
import PopupAddDL from '../../../component/Admin/AddTHvaLSP/AddDungLuong';
import PopupAddMauSac from '../../../component/Admin/AddTHvaLSP/AddMauSac';
import { useDispatch, useSelector } from 'react-redux';
import { loadingmodal } from '../../../redux/slice/filterSlice';


export default function AddNhapHang(props) {
    const navigate = useNavigate();
    const [addtensp, setTenSP] = useState('');
    const [dsSanPham, setDSSanPham] = useState([]);
    const [tenncc, setTenNCC] = useState(0);
    const [addloaisp, setLoaiSP] = useState(0);
    const [dsLoaiSP, setDSLSP] = useState([]);
    const [dsNCC, SetDSNCC] = useState([]);
    const [ten_mau_sac, setTenMauSac] = useState(0);
    const [dsmausac, setDSMauSac] = useState([]);
    const [kich_thuoc, setKichThuoc] = useState(0);
    const [dsdungluong, setDSDL] = useState([]);
    const [giatien, setGiaTien] = useState(0);
    const [sl, setSL] = useState(0);
    const [ghichu, setGhiChu] = useState('');
    const [formdata, setFormData] = useState({});
    const user = useSelector(state => state.auth.user);
    const isloadingmodal = useSelector(state => state.filter.loading);
    const dispatch = useDispatch();
    const [modalIsOpenNCC, setModalIsOpenNCC] = useState(false);
    const [modalIsOpenLSP, setModalIsOpenLSP] = useState(false);
    const [modalIsOpenDL, setModalIsOpenDL] = useState(false);
    const [modalIsOpenMS, setModalIsOpenMS] = useState(false);

    const openModalDL = () => setModalIsOpenDL(true);
    const closeModalDL = () => setModalIsOpenDL(false);

    const openModalNCC = () => setModalIsOpenNCC(true);
    const closeModalNCC = () => setModalIsOpenNCC(false);

    const openModalLSP = () => setModalIsOpenLSP(true);
    const closeModalLSP = () => setModalIsOpenLSP(false);

    const openModalMS = () => setModalIsOpenMS(true);
    const closeModalMS = () => setModalIsOpenMS(false);

    useEffect(() => {
        async function setncc() {
            var response = await fetch(`http://127.0.0.1:8000/api/nhacungcap/nhacungcap-admin`);
            var json = await response.json();
            SetDSNCC(json.data)

        }
        setncc();
    }, []);
    useEffect(() => {
        async function setloaisp() {
            var response = await fetch(`http://127.0.0.1:8000/api/loaisp/loaisp-admin`);
            var json = await response.json();
            setDSLSP(json.data)
        }
        setloaisp();

    }, []);

    useEffect(() => {
        async function setmausac() {
            var response = await fetch(`http://127.0.0.1:8000/api/mausac/mausac-admin`);
            var json = await response.json();
            setDSMauSac(json.data)
        }
        setmausac();
    }, []);
    useEffect(() => {
        async function setdungluong() {
            var response = await fetch(`http://127.0.0.1:8000/api/dungluong/dungluong-admin`);
            var json = await response.json();
            setDSDL(json.data)
        }
        setdungluong();
    }, [])

    const listnhacungcap = dsNCC.map(function (item) {
        return (
            <option value={item.id}>{item.ten}</option>
        );
    });

    const listloaisanpham = dsLoaiSP.map(function (item) {
        return (

            <option value={item.id}>{item.ten_loai}</option>
        );
    });


    const listsanpham = dsSanPham.map(function (item) {
        return (
            <option value={item.id}>{item.ten}</option>
        );
    });

    const listdungluong = dsdungluong.map(function (item) {
        return (
            <option value={item.id}>{item.kich_thuoc}</option>
        );
    });

    const listmausac = dsmausac.map(function (item) {
        return (
            <option value={item.id}>{item.ten_mau_sac}</option>
        );
    });

    const themmoiLSP = async (loaisp) => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/loaisp/themmoi-loaisp', {
                loaisp
            });
            setDSLSP(dsLoaiSP => [...dsLoaiSP, response.data.data]);
            //setLoaiSP(response.data.data.id);
            console.log('Thêm loại sản phẩm thành công:', response.data);
        } catch (error) {
            console.error('Lỗi thêm loại sản phẩm:', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }
    const themmoiDL = async (kich_thuoc) => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/dungluong/themmoi-dungluong', {
                kich_thuoc
            });
            setDSDL(dsdungluong => [...dsdungluong, response.data.data]);
            //setLoaiSP(response.data.data.id);
            console.log('Thêm Dung Luong thành công:', response.data);
        } catch (error) {
            console.error('Lỗi Thêm Dung Luong:', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }

    const themmoiNCC = async (tenncc) => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/nhacungcap/themmoi-nhacungcap', {
                tenncc
            });
            SetDSNCC(dsNCC => [...dsNCC, response.data.data]);
            //setLoaiSP(response.data.data.id);
            console.log('Thêm nha cung cap thành công:', response.data);
        } catch (error) {
            console.error('Lỗi thêm nha cung cap', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }

    const themmoiMauSac = async (ten_mau_sac) => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/mausac/themmoi-mausac', {
                ten_mau_sac
            });
            setDSMauSac(dsmausac => [...dsmausac, response.data.data]);
            //setLoaiSP(response.data.data.id);
            console.log('Thêm Màu Sắc thành công:', response.data);
        } catch (error) {
            console.error('Lỗi thêm Màu Sắc', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }

    const themmoinhaphang = (e) => {
        e.preventDefault();
        console.log('formdataa', formdata);
        const getAPI = async () => {
            try {
                dispatch(loadingmodal(true));
                const response = await axios.post('http://127.0.0.1:8000/api/nhaphang/nhaphang', {
                    'ten_san_pham': formdata.ten_san_pham,
                    'mau_sac_id': formdata.mau_sac_id,
                    'dung_luong_id': formdata.dung_luong_id,
                    'user_id': user.id,
                    'nha_cung_cap_id': formdata.nha_cung_cap_id,
                    'loai_san_pham_id': formdata.loai_san_pham_id,
                    'so_luong': formdata.so_luong,
                    'gia': formdata.gia,
                    'ghi_chu': formdata.ghi_chu,
                })

                if (response.data.success) {
                    dispatch(loadingmodal(false));
                    alert('done');
                }
                dispatch(loadingmodal(false));
            } catch (error) {

            }
        }
        getAPI()
    }
    return (
        <>
            {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin />
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin />
                    <main style={{ width: '80%', height: '45rem', overflow: 'scroll' }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2"> NHẬP HÀNG  </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                </div>
                            </div>
                        </div>
                        <PopupAddMauSac isOpen={modalIsOpenMS} onthemmoiMS={themmoiMauSac} onRequestClose={closeModalMS} />
                        <PopupAddNCC isOpen={modalIsOpenNCC} onthemmoincc={themmoiNCC} onRequestClose={closeModalNCC} />
                        <PopupAddLSP isOpen={modalIsOpenLSP} onthemmoi={themmoiLSP} onRequestClose={closeModalLSP} />
                        <PopupAddDL isOpen={modalIsOpenDL} onthemmoidl={themmoiDL} onRequestClose={closeModalDL} />
                        <form onSubmit={themmoinhaphang} className="row" >
                            <div className="col-12">
                                <div className="add_sp-ctsp">
                                    <div className="add_sp">
                                        <div style={{ border: 'solid 1px #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '15px', boxShadow: '5px 5px 5px #ccc' }}>
                                            <h3>Thông tin chung</h3>
                                            <div className="row">
                                                <div class="col-md-12">
                                                    <label for="Ten" className="form-label "> Tên sản phẩm </label>
                                                    <input type="text" value={addtensp} onChange={(e) => { setTenSP(e.target.value) }} required />
                                                </div>
                                            </div>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <label for="">Nhà cung cấp</label>
                                                <div style={{ display: 'flex' }}>
                                                    <div className="row" style={{ width: '75%', marginRight: '2%' }}>
                                                        <div className="col-md-12">
                                                            <select className="form-select" onChange={(e) => { setTenNCC(e.target.value) }} required>
                                                                <option selected="" className="form-control">Nhà Cung Cấp</option>
                                                                {listnhacungcap}
                                                            </select>
                                                        </div>

                                                    </div>
                                                    {/* <div className="container"> */}

                                                    <button className='btn btn-outline-danger' type='button' style={{}} onClick={openModalNCC}>Thêm nhanh</button>
                                                    {/* </div> */}
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '1rem' }}>
                                                <label for="">Loại sản phẩm</label>
                                                <div style={{ display: 'flex' }}>
                                                    <div className="row" style={{ width: '75%', marginRight: '2%' }}>
                                                        <div className="col-md-12">

                                                            <select className="form-select" onChange={(e) => { setLoaiSP(e.target.value) }} required>
                                                                <option selected="" className="form-control">Loại Sản Phẩm</option>
                                                                {listloaisanpham}
                                                            </select>

                                                        </div>
                                                    </div>

                                                    <button className='btn btn-outline-danger' type='button' onClick={openModalLSP}>Thêm nhanh</button>

                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ border: 'solid 1px #ccc', padding: '1rem', borderRadius: '15px', marginBottom: '1rem', boxShadow: '5px 5px 5px #ccc' }}>
                                            <h3>thông tin cấu hình </h3>
                                            <div style={{ marginBottom: '10px' }}>
                                                <label for="">Dung Lượng</label>
                                                <div style={{ display: 'flex' }}>
                                                    <div className="row" style={{ width: '75%', marginRight: '2%' }}>
                                                        <div className="col-md-12">
                                                            <select className="form-select" value={kich_thuoc} onChange={(e) => { setKichThuoc(e.target.value) }} required>
                                                                <option selected="" className="form-control">Dung Lượng</option>
                                                                {listdungluong}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <button className='btn btn-outline-danger' type='button' onClick={openModalDL}>Thêm nhanh</button>

                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '1rem' }}>
                                                <label for="">Màu Sắc</label>
                                                <div style={{ display: 'flex' }}>
                                                    <div className="row" style={{ width: '75%', marginRight: '2%' }}>
                                                        <div className="col-md-12">
                                                            <select className="form-select" value={ten_mau_sac} onChange={(e) => { setTenMauSac(e.target.value) }} required>
                                                                <option selected="" className="form-control">Màu Sắc</option>
                                                                {listmausac}
                                                            </select>
                                                        </div>
                                                    </div>


                                                    <button className='btn btn-outline-danger ' type='button' style={{}} onClick={openModalMS}>Thêm nhanh</button>

                                                </div>
                                            </div>


                                            <div className="row" style={{ marginBottom: '1rem' }}>
                                                <div class="col-md-12">
                                                    <label for="Ten" className="form-label "> Số lượng </label>
                                                    <input style={{ border: 'solid 1px #ccc' }} type="number" min={0} value={sl} onChange={(e) => { setSL(e.target.value) }} required />
                                                </div>
                                            </div>
                                            <div className="row" style={{ marginBottom: '10px' }}>
                                                <div class="col-md-12">
                                                    <label for="Ten" className="form-label "> Giá Tiền </label>
                                                    <input style={{ border: 'solid 1px #ccc' }} type="number" min={0} value={giatien} onChange={(e) => { setGiaTien(e.target.value) }} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: '10px' }}>
                                            <div class="col-md-12">
                                                <label for="Ten" className="form-label "> Ghi chú </label>
                                                <textarea style={{ border: 'solid 1px #ccc' }} id="w3review" name="w3review" rows="4" cols="60" onChange={(e) => { setGhiChu(e.target.value) }}></textarea>
                                            </div>
                                        </div>
                                        <div className="row pt-3">
                                            <div className="col-md-12">
                                                <button type='submit' onClick={() => {
                                                    setFormData({
                                                        'ten_san_pham': addtensp,
                                                        'mau_sac_id': parseInt(ten_mau_sac),
                                                        'dung_luong_id': parseInt(kich_thuoc),
                                                        'user_id': user.id,
                                                        'nha_cung_cap_id': parseInt(tenncc),
                                                        'loai_san_pham_id': parseInt(addloaisp),
                                                        'so_luong': parseInt(sl),
                                                        'gia': parseInt(giatien),
                                                        'ghi_chu': ghichu,
                                                    })
                                                }} className="btn btn-primary">Thêm</button>
                                            </div>
                                        </div>
                                    </div>

                                </div></div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    )
}

