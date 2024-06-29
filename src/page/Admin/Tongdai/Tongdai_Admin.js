import Tongdai from "../../../component/Admin/Tongdai/Tongdai";
import { useEffect, useState } from "react";
import Header_Admin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";

export default function Tongdai_Admin(props){
    const [dstongdai, SetDSTD] = useState([]);
    
    useEffect (()=>{
        async function settongdai(){
            var response = await fetch (`http://127.0.0.1:8000/api/tongdai/tongdai-admin`);
            var json = await response.json();
            SetDSTD(json.data)
        }
        settongdai();
        
    },[])
    const listtongdai = dstongdai.map(function (item) {
        return (
            <Tongdai data={item} />
        );
    });


    return (
        <>
            <Header_Admin/>
            <div className="container-fluid">
                <div  className="row">
                    <TaskbarAdmin/>
                    <main style={{width:'80%',height: '45rem' , overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH TỔNG ĐÀI</h1>
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
                                    <th scope="col">Tên Số</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Giờ bắt đầu</th>
                                    <th scope="col">Giờ kết thúc </th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listtongdai}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )
}