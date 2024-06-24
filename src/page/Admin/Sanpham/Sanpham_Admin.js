
import { useEffect, useState } from "react";
import Header_Admin from "../../../layout/Admin/Header/Header";
import Sanpham from "../../../component/Admin/Sanpham/Sanpham";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";

export default function SanPhamAdmin(props){
    const [dssp, SetDSSP] = useState([]);
    
    useEffect (()=>{
        async function setsp(){
            var response = await fetch (`http://127.0.0.1:8000/api/sanpham/sanpham-admin`);
            var json = await response.json();
            SetDSSP(json.data)
        }
        setsp();
        
    },[])
    const listsanpham = dssp.map(function (item) {
        return (
            <Sanpham data={item} />
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
                            <h1 className="h2">DANH SÁCH SẢN PHẨM</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/themmoi-sanpham" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Nhà cung cấp</th>
                                    <th scope="col">Loại sản phẩm</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listsanpham}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )
}