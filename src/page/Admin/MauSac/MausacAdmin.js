import { useEffect, useState } from "react";

import HeaderAdmin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
import MauSac from "../../../component/Admin/MauSac/Mausac";
export default function MauSacAdmin(){
    const [dsmausac, setDSMauSac] = useState([]);
    useEffect(() => {
        async function setmausac() {
            var response = await fetch(`http://127.0.0.1:8000/api/mausac/mausac-admin`);
            var json = await response.json();
            setDSMauSac(json.data)
        }
        setmausac();
    }, []);
   
    const listmausac = dsmausac.map(function (item) {
        return (
            <MauSac data={item} />
        );
    });
    return (
        <>
            <HeaderAdmin/>
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH MÀU SẮC SẢN PHẨM</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/themmoi-mausac" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Màu Sắc</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listmausac}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )
}