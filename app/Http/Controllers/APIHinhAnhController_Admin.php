<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HinhAnh_Admin;
use App\Models\ChiTietSanPham_Admin;
use App\Models\SanPham_Admin;
use App\Models\MauSac_Admin;
class APIHinhAnhController_Admin extends Controller
{
    //
    public function danhSach($id)
    {
        $data = [];
        $sanpham = SanPham_Admin::find($id);
        $dshinhanh = HinhAnh_Admin::where('san_pham_id', $id)->get();

        foreach ($dshinhanh as $hinhanh) {
            $mausac = MauSac_Admin::find($hinhanh->mau_sac_id);

            array_push($data, [
                'ID' => $hinhanh->id,
                'san_pham_ten' => $sanpham->ten,
                'mau_sac_ten' => $mausac->ten_mau_sac,
                'ten_hinh_anh' => $hinhanh->ten_hinh_anh,
                'isAvatarimage' => $hinhanh->isAvatarimage
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
    public function themHinhAnh(Request $request)
    {
        $hinhanhsp = new HinhAnh_Admin();
        if ($request->hasFile('ten_hinh_anh')) {
            $image = $request->file('ten_hinh_anh');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('ten_hinh_anh'), $imageName);
            
            $hinhanhsp->san_pham_id = $request->san_pham_id;
            $hinhanhsp->mau_sac_id = $request->mau_sac_id; // Sử dụng trực tiếp mau_sac_id từ yêu cầu
            $hinhanhsp->ten_hinh_anh = 'ten_hinh_anh/' . $imageName;
            $hinhanhsp->isAvatarimage = $request->isAvatarimage;
            $hinhanhsp->save();

            return response()->json(['success' => 1, 'message' => 'Thêm mới thành công', 'data' => $hinhanhsp], 201);
        } else {
            return response()->json(['success' => 0, 'error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
        }
    }
    public function capNhatHinhAnh(Request $request, $id){
        $hinhanhsp = HinhAnh_Admin::find($id);
        if ($request->hasFile('ten_hinh_anh')) {
            $image = $request->file('ten_hinh_anh');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('ten_hinh_anh'), $imageName);
            $hinhanhsp->chi_tiet_san_pham_id = $request ->chi_tiet_san_pham_id;
            $hinhanhsp->ten_hinh_anh = 'ten_hinh_anh/'+$imageName;
            $hinhanhsp -> isAvatarimage = $request -> isAvatarimage ;
            $hinhanhsp->save();

            return response()->json(['success' => 1 ,'message' => 'Cập nhật thành công'], 201);
        } else {
            return response()->json(['success' =>0 ,'error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
        }
        
    }
    
}
