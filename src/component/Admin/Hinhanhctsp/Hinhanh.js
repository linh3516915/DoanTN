import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function HinhAnh(props){
    const { id } = useParams();
    const DeleteLoai = async(id) => {
            var response = await fetch(`http://127.0.0.1:8000/api/hinhanh/xoa-hinhanh/${id}`);
            var json = await response.json();
            alert('Xóa hình ảnh chi tiết sản phẩm thành công');
            window.location.reload('/hinhanh-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.ID}</th>
                <td>{props.data.chi_tiet_san_pham_ten}</td>
                <td> <img style={{width:'200px',height:'auto'}} src={`http://127.0.0.1:8000/${props.data.ten_hinh_anh}`}/></td>
                <td>{props.data.isAvatarimage}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-hinhanh/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteLoai(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}