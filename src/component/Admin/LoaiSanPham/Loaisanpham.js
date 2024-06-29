import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function LoaiSanPham(props){
    const { id } = useParams();
    const DeleteLoai = async(id) => {
            var response = await fetch(`http://127.0.0.1:8000/api/loaisp/xoa-loaisp/${id}`);
            var json = await response.json();
            alert('Xóa loại sản phẩm thành công');
            window.location.reload('/loaisanpham-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_loai}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-loaisanpham/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteLoai(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}