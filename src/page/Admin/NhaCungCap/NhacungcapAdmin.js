import { useEffect, useState } from "react";
import NhaCungCap from "../../../component/Admin/NhaCungCap/Nhacungcap";
import HeaderAdmin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
export default function NhaCungCapAdmin(){
    const [dsnhacungcap, setDSNCC] = useState([]);
    useEffect(() => {
        async function setncc() {
            var response = await fetch(`http://127.0.0.1:8000/api/nhacungcap/nhacungcap-admin`);
            var json = await response.json();
            setDSNCC(json.data)
        }
        setncc();
    }, []);
   
    const listnhacungcap = dsnhacungcap.map(function (item) {
        return (
            <NhaCungCap data={item} />
        );
    });
    return (
        <>
            <HeaderAdmin/>
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin/>
                    <main style={{width:'80%',height: '45rem' , overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH NHÀ CUNG CẤP</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/themmoi-nhacungcap" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên nhà cung cấp</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listnhacungcap}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )
}