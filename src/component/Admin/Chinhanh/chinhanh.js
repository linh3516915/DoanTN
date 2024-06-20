export default function ChiNhanh(props){
    return(
        <>
            <tr>
                <th scope="row">{props.data.id}</th>
                <td>{props.data.ten_chi_nhanh}</td>
                <td>{props.data.dia_chi}</td>
                <td>{props.data.sdt_tong_dai}</td>
                <td>{props.data.gio_mo_cua}</td>
                <td>{props.data.ngay_khai_truong}</td>
            </tr>
        </>

    );
}