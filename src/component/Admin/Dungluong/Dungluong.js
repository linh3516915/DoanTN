import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../../../api/api";
export default function DungLuong(props){
    const { id } = useParams();
    const DeleteLoai = async(id) => {
            var response = await fetch(`${apiUrl}/dungluong/xoa-dungluong/${id}`);
            var json = await response.json();
            alert('Xóa dung lượng sản phẩm thành công');
            window.location.reload('/dungluong-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.kich_thuoc}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-dungluong/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteLoai(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}