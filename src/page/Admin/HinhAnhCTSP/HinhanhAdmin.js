
import { useEffect, useState } from "react";
import Header_Admin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
import HinhAnh from "../../../component/Admin/Hinhanhctsp/Hinhanh";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../api/api";
export default function HinhAnhAdmin() {
    const { id } = useParams();
    const [dshinhanh, setDSHinhAnh] = useState([]);

    useEffect(() => {
        async function sethinhanh() {
            var response = await fetch(`${apiUrl}/hinhanh/hinhanh-admin/${id}`);
            var json = await response.json();
            setDSHinhAnh(json.data)
        }
        sethinhanh();
    }, [])
    console.log(setDSHinhAnh);
    const listhinhanh = dshinhanh.map(function (item) {
        return (
            < HinhAnh data={item} />
        );
    });
    return (
        <>
            <Header_Admin/>
            <div className="container-fluid">
                <div style={{height: '38rem'}} className="row">
                    <TaskbarAdmin/>
                    <main style={{width:'84%' , overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH HÌNH ẢNH </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/themmoi-hinhanh" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Tên màu sắc</th>
                                    <th scope="col">Hình ảnh</th>
                                    <th scope="col"> isAvatarimage </th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listhinhanh}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>
           
        </>
    )
}