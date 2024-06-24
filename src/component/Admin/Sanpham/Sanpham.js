import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Sanpham(props){
    const { id } = useParams();
    const DeleteSP = async(id) => {
            var response = await fetch(`http://127.0.0.1:8000/api/sanpham/xoa-sanpham/${id}`);
            var json = await response.json();
            alert('Xóa thành công');
            window.location.reload('/sanpham-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten}</td>
                <td>{props.data.nha_cung_cap_ten}</td>
                <td>{props.data.loai_san_pham_ten}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/chitietsanpham-admin/${props.data.id}`}>Chi Tiết Sản Phẩm </NavLink> ||
                    <NavLink className="btn btn-secondary" to={`/chitietcauhinh-admin/${props.data.id}`}>Chi Tiết Cấu Hình </NavLink> ||
                    <NavLink className="btn btn-secondary" to={`/capnhat-sanpham/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteSP(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}