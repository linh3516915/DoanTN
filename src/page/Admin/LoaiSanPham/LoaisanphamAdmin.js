import { useEffect, useState } from "react";
import Header_Admin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
import LoaiSanPham from "../../../component/Admin/LoaiSanPham/Loaisanpham";

export default function LoaisanphamAdmin(){
    const [dsloaisp, setDSLoai] = useState([]);
    
    useEffect(()=> {
        async function setloaisp() {
        var response = await fetch(`http://127.0.0.1:8000/api/loaisp/loaisp-admin`);
        var json = await response.json();
        setDSLoai(json.data)
        }
        setloaisp();
    },[])
   
    const listloaisp = dsloaisp.map(function (item) {
        return (
            < LoaiSanPham data={item} />
        );
    });

    return (
        <>
            <Header_Admin/>
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH CHI NHÁNH</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/themmoi-loaisanpham" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Loại</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listloaisp}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )
}