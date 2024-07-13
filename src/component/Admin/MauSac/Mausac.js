import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../../../api/api";
export default function MauSac(props){
    const { id } = useParams();
    const DeleteMauSac = async(id) => {
            var response = await fetch(`${apiUrl}/mausac/xoa-mausac/${id}`);
            var json = await response.json();
            alert('Xóa màu sắc sản phẩm thành công');
            window.location.reload('/mausac-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_mau_sac}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-mausac/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteMauSac(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}