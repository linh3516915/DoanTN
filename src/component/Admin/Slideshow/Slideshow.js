import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Slideshow(props){
    const { id } = useParams();
    const DeleteLoai = async(id) => {
            var response = await fetch(`http://127.0.0.1:8000/api/slideshow/xoa-slideshow/${id}`);
            var json = await response.json();
            alert('Xóa hình ảnh chi tiết sản phẩm thành công');
            window.location.reload('/slideshow-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_anh}</td>
                <td> <img style={{width:'200px',height:'auto'}} src={`http://127.0.0.1:8000/URL_anh/${props.data.URL_anh}`}/></td>
                <td>{props.data.noi_dung}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-hinhanh/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteLoai(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}