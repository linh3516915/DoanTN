import { useParams } from "react-router-dom";
import { apiUrl } from "../../../api/api";
export default function ChiNhanh(props){
    const { id } = useParams();
    const DeleteChinhanh = async(id) => {
            var response = await fetch(`${apiUrl}/diachi/xoa-chinhanh/${id}`);
            var json = await response.json();
            alert('Xóa chi nhánh thành công');
            window.location.reload('/chinhanh-admin');
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_chi_nhanh}</td>
                <td>{props.data.dia_chi}</td>
                <td>{props.data.sdt_tong_dai}</td>
                <td>{props.data.gio_mo_cua}</td>
                <td>{props.data.ngay_khai_truong}</td>
                <td>
                    <button className="btn btn-secondary"  onClick={() => {DeleteChinhanh(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}