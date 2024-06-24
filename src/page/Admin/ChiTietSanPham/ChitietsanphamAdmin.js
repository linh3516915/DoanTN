
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChiTietSanPham from "../../../component/Admin/ChiTietSanPham/Chitietsanpham";
import HeaderAdmin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
export default function ChiTietSanPhamAdmin(props) {

    const {id} = useParams();
    const [dsctsp, SetDSCTSP] = useState([]);


    useEffect(() => {
        async function setctsp() {
            var response = await fetch(`http://127.0.0.1:8000/api/ctsp/ctsp-admin/${id}`);
            var json = await response.json();
            SetDSCTSP(json.data)

        }
        setctsp();
    }, []);
    const listCTSP = dsctsp.map(function (item) {
        return (
            <ChiTietSanPham data={item} />
        );
    });

    return (
        <>
             {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin/>
            <div className="container-fluid">
                <div className="row">
                    <TaskbarAdmin/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH CHI TIẾT SẢN PHẨM</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                  <NavLink to={`/themmoi-chitietsanpham/${id}`} className="btn btn-secondary" >Thêm mới</NavLink>
                                </div>

                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên chi tiết sản phẩm</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Dung lượng</th>
                                    <th scope="col">Màu sắc</th>
                                    <th scope="col">Ram</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Giá tiền</th>
                                    <th scope="col">Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {listCTSP}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )

}


