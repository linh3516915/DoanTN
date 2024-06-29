import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function ChiTietSanPham(props) {
   
    const { id } = useParams();
    const Delete = async(id) => {
        var response = await fetch(`http://127.0.0.1:8000/api/ctsp/xoa-ctsp/${id}`);
        var json = await response.json();
        alert('Xóa thành công');
        window.location.reload('/chitietsanpham-admin');
        
};
  
    return (
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten}</td>
                <td>{props.data.san_pham_ten}</td>
                <td>{props.data.dung_luong_ten}</td>
                <td>{props.data.mau_sac_ten}</td>
                <td>{props.data.ram_ten}</td>
                <td>{props.data.so_luong}</td>
                <td>{props.data.gia}</td>
                <td>
                <NavLink className="btn btn-secondary" to={`/capnhat-chitietsanpham/${props.data.id}`}>Cập nhật</NavLink> |
                <button className="btn btn-secondary"  onClick={() => {Delete(props.data.id)}}>Xóa</button>
                </td>
            </tr>   
        </>
    );

}
