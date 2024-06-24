
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
export default function AddChiTietSanPham(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tenctsp, setTenCTSP] = useState('');
    const [dungluong, setDungLuong] = useState('');
    const [dsdungluong, setDSDungLuong] = useState([]);
    const [mausac, setMauSac] = useState('');
    const [dsmausac, setDSMauSac] = useState([]);
    const [loairam,setRam]= useState('');
    const [dsram,setDSRam]= useState([]);
    const [soluong, setSL] = useState('');
    const [gia, setGia] = useState('');
    useEffect(() => {
        async function setdl() {
            var response = await fetch(`http://127.0.0.1:8000/api/dungluong/dungluong-admin`);
            var json = await response.json();
            setDSDungLuong(json.data)

        }
        setdl();
    }, []);
    useEffect(() => {
        async function setms() {
            var response = await fetch(`http://127.0.0.1:8000/api/mausac/mausac-admin`);
            var json = await response.json();
            setDSMauSac(json.data)

        }
        setms();
    }, []);
    useEffect(() => {
        async function setram() {
            var response = await fetch(`http://127.0.0.1:8000/api/ram/ram-admin`);
            var json = await response.json();
            setDSRam(json.data)

        }
        setram();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/ctsp/themmoi-ctsp/${id}`, {
                tenctsp,
                dungluong,
                mausac,
                loairam,
                soluong,
                gia

            });
            if (response.data.success == -1) {
                alert(response.data.message);
            }
            else if (response.data.success == 0) {
                alert(response.data.message);
            }
            else {
                alert('Thêm chi tiết sản phẩm  thành công')
                navigate(`/chitietsanpham-admin/${id}`);
            }

            console.log("check them moi", response.data);
        } catch (error) {
        }
    };
    const listdungluong = dsdungluong.map(function (item) {
        return (
            <ListDungLuong data={item} />
        );
    });
    const listmausac = dsmausac.map(function (item) {
        return (
            <ListMauSac data={item} />
        );
    });
    const listram = dsram.map(function (item) {
        return (
            <ListRam data={item} />
        );
    });
    function ListDungLuong(props) {
        return (
            <>
                <option value={props.data.id}>{props.data.kich_thuoc}</option>
            </>
        );
    }
    function ListMauSac(props) {
        return (
            <>
                <option value={props.data.id}>{props.data.ten_mau_sac}</option>
            </>
        );
    }
    function ListRam(props) {
        return (
            <>
                <option value={props.data.id}>{props.data.loai_ram}</option>
            </>
        );
    }


    return (
        <>
            {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin/>
            <div className="container-fluid">
                <div className="row">
                <TaskbarAdmin/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">THÊM MỚI CHI TIẾT SẢN PHẨM</h1>
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
                                                <label for="Ten" className="form-label "> Tên chi tiết sản phẩm </label>
                                                <input type="text" value={tenctsp} onChange={(e) => { setTenCTSP(e.target.value) }} required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label for="">Select Dung Lượng</label>
                                                <select className="form-select" value={dungluong} onChange={(e) => { setDungLuong(e.target.value) }} required>
                                                    <option selected="" className="form-control">Dung Lượng</option>
                                                    {listdungluong}
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label for="">Select Màu Sắc </label>
                                                <select className="form-select" value={mausac} onChange={(e) => { setMauSac(e.target.value) }} required>
                                                    <option selected="" className="form-control">Màu Sắc</option>
                                                    {listmausac}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label for="">Select Ram </label>
                                                <select className="form-select" value={loairam} onChange={(e) => { setRam(e.target.value) }} required>
                                                    <option selected="" className="form-control">Ram </option>
                                                    {listram}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> Số lượng </label>
                                                <input type="text" value={soluong} onChange={(e) => { setSL(e.target.value) }} required />
                                            </div>
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> Giá tiền </label >
                                                <input type="text" value={gia} onChange={(e) => { setGia(e.target.value) }} required />
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

