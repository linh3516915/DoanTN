
import React, { useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
export default function UpdateChitietcauhinh(props) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [tenctch, setTenCTCH] = useState('');
    const [cpu,setCPU] = useState('');
    const [kichthuocmanhinh,setKichThuoc] = useState('');
    const [hedieuhanh, setHeDieuHanh] = useState('');
    const [camera, setCamera] = useState(''); 
    const [pin, setPIN] = useState(''); 
    const [sim, setSIM] = useState(''); 
    const [gpu, setGPU] = useState(''); 
    const [tocdocpu, setTocDoCPU] = useState('');         
    const [gps, setGPS] = useState('');
    const [ngayramat, setNgayRaMat] = useState(''); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/ctch/capnhat-ctch/${id}`, {
               tenctch,
               cpu,
               kichthuocmanhinh,
               hedieuhanh,
               camera,
               pin,
               sim,
               gpu,
               tocdocpu,
               gps,
               ngayramat
            });
            if(response.data.success == 0 ){
                alert(response.data.message);
            }
            else{
                alert('Cập nhật chi tiết cấu hình sản phẩm thành công')
                navigate(`/chitietcauhinh-admin/${response.data.san_pham_id}`);
            }

            console.log("check them moi", response.data);
        } catch (error) {
        }
    };


    return (
        <>
         {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin/>
            <div className="container-fluid">
                <div className="row">
                   <TaskbarAdmin/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">CẬP NHẬT CHI TIẾT CẤU HÌNH SẢN PHẨM</h1>
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
                                                <label for="Ten" className="form-label "> Tên chi tiết cấu hình </label>
                                                <input type="text" value={tenctch} onChange={(e) => { setTenCTCH(e.target.value) }} required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> CPU </label>
                                                <input type="text" value={cpu} onChange={(e) => { setCPU(e.target.value) }} required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> Kích thước màn hình </label>
                                                <input type="text" value={kichthuocmanhinh} onChange={(e) => { setKichThuoc(e.target.value) }} required />
                                            </div>

                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> Hệ điều hành </label>
                                                <input type="text" value={hedieuhanh} onChange={(e) => { setHeDieuHanh(e.target.value) }} required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> CAMERA </label>
                                                <input type="text" value={camera} onChange={(e) => { setCamera(e.target.value) }} required />
                                            </div>
                                       
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> PIN </label>
                                                <input type="text" value={pin} onChange={(e) => { setPIN(e.target.value) }} required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> SIM </label>
                                                <input type="text" value={sim} onChange={(e) => { setSIM(e.target.value) }} required />
                                            </div>
                                      
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> GPU </label>
                                                <input type="text" value={gpu} onChange={(e) => { setGPU(e.target.value) }} required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label "> Tốc độ CPU </label>
                                                <input type="text" value={tocdocpu} onChange={(e) => { setTocDoCPU(e.target.value) }} required />
                                            </div>
                                        
                                            <div class="col-md-6">
                                                <label for="Ten" className="form-label ">  GPS </label>
                                                <input type="text" value={gps} onChange={(e) => { setGPS(e.target.value) }} required />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div class="col-md-12">
                                                <label for="Ten" className="form-label "> Ngày ra mắt </label>
                                                <input type="date" value={ngayramat} onChange={(e) => { setNgayRaMat(e.target.value) }} required />
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

