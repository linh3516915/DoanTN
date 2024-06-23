<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoaiSanPham_Admin;

class APILoaiSanPhamController_Admin extends Controller
{
    //
    public function danhSach(){
        $loaisp = LoaiSanPham_Admin::all();
        return response()->json([
            'data' => $loaisp,
        ]);
    }
}
