<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HinhAnh_Admin;
use App\Models\ChiTietSanPham_Admin;
class APIHinhAnhController_Admin extends Controller
{
    //
    public function danhSach(){
    $data = [];
        $dshinhanh = HinhAnh_Admin::all();
        for( $i=0;$i<count($dshinhanh);$i++){
            $chitietsanpham = ChiTietSanPham_Admin::find($dshinhanh[$i]->chi_tiet_san_pham_id);
            array_push($data,[
                'ID' => $dshinhanh[$i]-> id,
                'chi_tiet_san_pham_ten'=>   $chitietsanpham->ten,
                'ten_hinh_anh' => $dshinhanh[$i]->ten_hinh_anh,
                'isAvatarimage' => $dshinhanh[$i]-> isAvatarimage

            ]);
           
        }
        return response()-> json([
            'success' => true,
            'data'    => $data
        ]);       
    } 
    public function themHinhAnh(Request $request)
    {
        $hinhanhsp = new HinhAnh_Admin();
        if ($request->hasFile('ten_hinh_anh')) {
            $image = $request->file('ten_hinh_anh');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('ten_hinh_anh'), $imageName);
            $hinhanhsp->chi_tiet_san_pham_id = $request ->chi_tiet_san_pham_id;
            $hinhanhsp->ten_hinh_anh = 'ten_hinh_anh/'+$imageName;
            $hinhanhsp -> isAvatarimage = $request -> isAvatarimage ;
            $hinhanhsp->save();

            return response()->json(['success' => 1 ,'message' => 'Thêm mới thành công'], 201);
        } else {
            return response()->json(['success' =>0 ,'error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
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
