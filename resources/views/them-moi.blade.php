<form method="POST" action="">
   @csrf
    <table border=0>
        <tr>
            <th>MSSV</th>
            <td><input type="text" name="mssv"/></td>
        </tr>
        <tr>
            <th>Ho ten</th>
            <td><input type="text" name="ho_ten"/></td>
        </tr>
        <tr>
            <th>Lop</th>
            <td><input type="text" name="lop"/></td>
        </tr>
        <tr>
            <th>Email</th>
            <td><input type="text" name="email"/></td>
        </tr>
        <tr>
            <th>Dien thoai</th>
            <td><input type="text" name="dien_thoai"/></td>
        </tr>
        <tr>
            <th></th>
            <td><button type="submit">Luu</button></td>
        </tr>
    </table>
</form>