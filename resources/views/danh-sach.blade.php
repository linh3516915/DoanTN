<h1>DANH SACH SINH VIEN</h1>
<table border=1>
    <tr>
        <th>ID</td>
        <th>MSSV</th>
        <th>HO TEN</th>
        <th>LOP</th>
        <th>EMAIL</th>
        <th>DIEN THOAI</th>
        <th></th>
    </tr>
    @foreach($dsSinhVien as $sinhVien)
    <tr>
        <td>{{ $sinhVien->id }}</td>
        <td>{{ $sinhVien->mssv }}</td>
        <td>{{ $sinhVien->ho_ten }}</td>
        <td>{{ $sinhVien->lop }}</td>
        <td>{{ $sinhVien->email }}</td>
        <td>{{ $sinhVien->dien_thoai }}</td>
        <td>
            <a href="#">Sua</a> | <a href="#">Xoa</a>
        </td>
    <tr>
    @endforeach
</table>