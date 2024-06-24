
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
import { useParams } from 'react-router-dom';
export default function UpdateSanPham(props) {
    const {id}=useParams();
    const navigate = useNavigate();
    const [addtensp, setTenSP] = useState('');
    const [addncc, setNCC] = useState('');
    const [addloaisp, setLoaiSP] = useState('');
    const [dsLoaiSP, setDSLSP] = useState([]);
    const [dsNCC, SetDSNCC] = useState([]);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/sanpham/capnhat-sanpham/${id}`, {
                addtensp,
                addncc,
                addloaisp
            });

            console.log("check them moi", response.data);
            alert('Cập sản phẩm  thành công')   
            navigate('/sanpham-admin');
        } catch (error) {
        }
    };
    const listnhacungcap = dsNCC.map(function (item) {
        return (
            <Listncc data={item} />
        );
    });
    function Listncc(props) {
        return (
            <>
                <option value={props.data.id}>{props.data.ten}</option>
            </>
        );
    }
    const listloaisanpham = dsLoaiSP.map(function(item){
        return(
            <Listloaisanpham data={item}/>
        );
    });
    function Listloaisanpham(props){
        return(
            <>
                <option value={props.data.id}>{props.data.ten_loai}</option>
            </>
        )
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
                            <h1 className="h2">CẬP NHẬT SẢN PHẨM </h1>
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
                                                <label for="tensp" className="form-label ">Tên sản phẩm</label>
                                                <input type="text" value={addtensp} onChange={(e) => { setTenSP(e.target.value) }} required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <label for="">Nhà cung cấp</label>
                                                <select className="form-select" value={addncc} onChange={(e) => { setNCC(e.target.value) }} required>
                                                    <option selected="" className="form-control">Nhà Cung Cấp</option>
                                                    {listnhacungcap}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <label for="">Loại sản phẩm</label>
                                                <select className="form-select" value={addloaisp} onChange={(e) => { setLoaiSP(e.target.value) }} required>
                                                    <option selected="" className="form-control">Loại Sản Phẩm</option>
                                                    {listloaisanpham}
                                                </select>
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

