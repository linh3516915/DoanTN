
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
import HeaderAdmin from "../../../layout/Admin/Header/Header";
import ChiTietCauHinh from "../../../component/Admin/Chitietcauhinh/Chitietcauhinh";
import { NavLink } from "react-router-dom";
export default function ChiTietCauHinhAdmin(props) {

    const {id} = useParams();
    const [dsctch, SetDSCH] = useState([]);


    useEffect(() => {
        async function setctch() {
            var response = await fetch(`http://127.0.0.1:8000/api/ctch/ctch-admin/${id}`);
            var json = await response.json();
            SetDSCH(json.data)

        }
        setctch();
    }, []);
    const listCTCH = dsctch.map(function (item) {
        return (
            <ChiTietCauHinh data={item} />
        );
    });

    return (
        <>
        {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin/>
            <div className="container-fluid">
                <div className="row">
                   <TaskbarAdmin/>
                    <main style={{width:'80%',height: '45rem' , overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH CHI TIẾT CÁU HÌNH SẢN PHẨM</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <NavLink to={`/themmoi-chitietcauhinh/${id}`} className="btn btn-secondary" >Thêm mới</NavLink>
                                </div>
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên chi tiết cấu hình</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">CPU</th>
                                    <th scope="col">Kích thước màn hình</th>
                                    <th scope="col">hệ điều hành</th>
                                    <th scope="col">Camera</th>
                                    <th scope="col">Pin</th>
                                    <th scope="col">Sim</th>
                                    <th scope="col">GPU</th>
                                    <th scope="col">Tốc độ CPU</th>
                                    <th scope="col">GPS</th>
                                    <th scope="col">Ngày ra mắtmắt</th>
                                    <th scope="col">Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {listCTCH}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )

}


