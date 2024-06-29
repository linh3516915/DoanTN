export default function Tongdai(props) {
    return (
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_so}</td>
                <td>{props.data.so_dien_thoai}</td>
                <td>{props.data.gio_bat_dau_hoat_dong}</td>
                <td>{props.data.gio_ket_thuc_hoat_dong}</td>
            </tr>
        </>
    );
}