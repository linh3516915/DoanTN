import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiUrl, apiUrl_anh } from "../../../api/api";
export default function Slideshow(props){
    const { id } = useParams();
    const DeleteSlideshow = async(id) => {
            var response = await fetch(`${apiUrl}/slideshow/xoa-slideshow/${id}`);
            var json = await response.json();
            alert('Xóa Slideshow thành công');
            window.location.reload('/slideshow-admin');
            
    };
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_anh}</td>
                <td> <img style={{width:'200px',height:'auto'}} src={`${apiUrl_anh}/${props.data.URL_anh}`}/></td>
                <td>{props.data.noi_dung}</td>
                <td>
                    <NavLink className="btn btn-secondary" to={`/capnhat-slideshow/${props.data.id}`}>Cập nhật</NavLink> ||
                    <button className="btn btn-secondary"  onClick={() => {DeleteSlideshow(props.data.id)}}>Xóa</button>
                </td>
            </tr>
        </>

    );
}