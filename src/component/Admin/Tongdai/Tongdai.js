import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../../../api/api";

export default function Tongdai(props) {
    const { id } = useParams();
    const DeleteTongDai = async(id) => {
            var response = await fetch(`${apiUrl}/tongdai/xoa-tongdai/${id}`);
            var json = await response.json();
            alert('Xóa tổng đài thành công');
            window.location.reload('/tongdai-admin');
            
    };
    return (
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_so}</td>
                <td>{props.data.so_dien_thoai}</td>
                <td>{props.data.gio_bat_dau_hoat_dong}</td>
                <td>{props.data.gio_ket_thuc_hoat_dong}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-tongdai/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteTongDai(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>
    );
}