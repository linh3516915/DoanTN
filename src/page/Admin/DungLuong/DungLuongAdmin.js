
import { useEffect, useState } from "react";
import Header_Admin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
import DungLuong from "../../../component/Admin/Dungluong/Dungluong";

export default function DungLuongAdmin(){
    const [dsdungluong, setDSDL] = useState([]);
    
    useEffect(()=> {
        async function setdungluong() {
        var response = await fetch(`http://127.0.0.1:8000/api/dungluong/dungluong-admin`);
        var json = await response.json();
        setDSDL(json.data)
        }
        setdungluong();
    },[])
   
    const listdungluong = dsdungluong.map(function (item) {
        return (
            < DungLuong data={item} />
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
                            <h1 className="h2">DANH SÁCH DUNG LƯỢNG</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/themmoi-dungluong" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Kích Thước</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listdungluong}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )
}