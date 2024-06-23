<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiaChiThuongHieu_Admin;

class APIDiaChiThuongHieuController_Admin extends Controller
{
    //
    public function danhSach(){
        $dsdiachi = DiaChiThuongHieu_Admin::all();
        return response()-> json([
            'success' => true,
            'data'    => $dsdiachi
        ]);
    }
}
