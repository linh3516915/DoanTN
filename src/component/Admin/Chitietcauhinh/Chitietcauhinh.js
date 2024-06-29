import { NavLink} from "react-router-dom";
import { useParams } from "react-router-dom";
export default function ChiTietCauHinh(props) {
    const { id } = useParams();
    const Delete = async(id) => {
            var response = await fetch(`http://127.0.0.1:8000/api/ctch/xoa-ctch/${id}`);
            var json = await response.json();
            alert('Xóa thành công');
            window.location.reload(`/chitietcauhinh-admin/${id}`);
            
    };
   
    return (
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_ctch}</td>
                <td>{props.data.san_pham_ten}</td>
                <td>{props.data.cpu}</td>
                <td>{props.data.size_man_hinh}</td>
                <td>{props.data.he_dieu_hanh}</td>
                <td>{props.data.camera}</td>
                <td>{props.data.pin}</td>
                <td>{props.data.sim}</td>
                <td>{props.data.gpu}</td>
                <td>{props.data.toc_do_cpu}</td>
                <td>{props.data.gps}</td>
                <td>{props.data.ngay_ra_mat}</td>
                <td>
                <NavLink className="btn btn-secondary" to={`/capnhat-chitietcauhinh/${props.data.id}`}>Cập nhật</NavLink> ||
                <button className="btn btn-secondary"  onClick={() => {Delete(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>
    );

}
