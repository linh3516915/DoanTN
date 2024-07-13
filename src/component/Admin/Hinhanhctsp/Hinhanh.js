import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiUrl, apiUrl_anh } from "../../../api/api";
export default function HinhAnh(props){
    const { id } = useParams();
    const DeleteLoai = async(id) => {
            var response = await fetch(`${apiUrl}/hinhanh/xoa-hinhanh/${id}`);
            var json = await response.json();
            alert('Xóa hình ảnh chi tiết sản phẩm thành công');
            window.location.reload('/hinhanh-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.ID}</th>
                <td>{props.data.san_pham_ten}</td>
                <td>{props.data.mau_sac_ten}</td>
                <td> <img style={{width:'200px',height:'auto'}} src={`${apiUrl_anh}/${props.data.ten_hinh_anh}`}/></td>
                <td>{props.data.isAvatarimage}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-hinhanh/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteLoai(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}