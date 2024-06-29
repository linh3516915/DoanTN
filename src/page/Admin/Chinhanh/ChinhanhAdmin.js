
import { useEffect, useState } from "react";
import ChiNhanh from "../../../component/Admin/Chinhanh/chinhanh";
import Header_Admin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";



export default function ChinhanhAdmin(){
    const [dschinhanh, SetDSCN] = useState([]);
    
    useEffect(()=> {
        async function setchinhanh() {
        var response = await fetch(`http://127.0.0.1:8000/api/diachi/chinhanh-admin`);
        var json = await response.json();
            SetDSCN(json.data)
        }
        setchinhanh();
    },[])
   
    const listchinhanh = dschinhanh.map(function (item) {
        return (
            <ChiNhanh data={item} />
        );
    });

    return (
        <>
            <Header_Admin/>
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin/>
                    <main style={{width:'80%',height: '45rem' , overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH CHI NHÁNH</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên chi nhánh</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Liên hệ</th>
                                    <th scope="col">Giờ mở cửa</th>
                                    <th scope="col">Ngày khai trương</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listchinhanh}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>
        </>
    )
}