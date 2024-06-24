<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HinhAnh_Admin;
use App\Models\ChiTietSanPham_Admin;
class APIHinhAnhController_Admin extends Controller
{
    //
    public function danhSach(){
        
        $dshinhanh = HinhAnh_Admin::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dshinhanh
            ]);
    } 
    public function themHinhAnh(Request $request)
    {
        $hinhanhsp = new HinhAnh_Admin();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            $hinhanhsp->chi_tiet_san_pham = $request -> ten_ctsp;
            $hinhanhsp->ten_hinh_anh = $imageName;
            $hinhanhsp->save();

            return response()->json(['message' => 'Thêm mới thành công'], 201);
        } else {
            return response()->json(['error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
        }
    }
}
