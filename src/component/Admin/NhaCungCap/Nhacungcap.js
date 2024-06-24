import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
export default function NhaCungCap(props){
    const { id } = useParams();
    const DeleteNCC = async(id) => {
            var response = await fetch(`http://127.0.0.1:8000/api/nhacungcap/xoa-nhacungcap/${id}`);
            var json = await response.json();
            alert('Xóa nhà cung cấp thành công');
            window.location.reload('/sanpham-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-nhacungcap/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteNCC(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}