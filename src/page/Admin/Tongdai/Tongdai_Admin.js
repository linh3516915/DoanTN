import Tongdai from "../../../component/Admin/Tongdai/Tongdai";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Header_Admin from "../../../layout/Admin/Header/Header";

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
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <ul className="nav flex-column">
                                <li>  <NavLink to="/chinhanh-admin" className="nav-link  text-secondary" >Chi Nhánh</NavLink></li>
                                <li>  <NavLink to="/tongdai-admin" className="nav-link  text-secondary" >Tổng Đài</NavLink></li>
                                <li>  <NavLink to="/supplier" className="nav-link  text-secondary" >Suppliers Manager</NavLink></li>
                                <li>  <NavLink to="/comment" className="nav-link  text-secondary" >Comment Manager</NavLink></li>
                                <li>  <NavLink to="/don-hang-admin" className="nav-link  text-secondary" >Order Manager</NavLink></li>
                                
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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